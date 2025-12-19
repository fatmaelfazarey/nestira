import { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Bot, Send, User, HelpCircle, Rocket, Users, CreditCard, ClipboardList, RotateCcw } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { addMessage, subscribeMessages, markMessagesAsRead, deleteHelpChatForBothUsers } from '@/services/chatService';

interface Message {
  id: string;
  text: string;
  isBot: boolean;
  isHuman: boolean;
  timestamp: Date;
  senderId?: string;
  isLocal?: boolean; // إضافة حقل جديد للرسائل المحلية
}

interface FAQ {
  question: string;
  answer: string;
}

interface FAQCategory {
  category: string;
  icon: React.ElementType;
  faqs: FAQ[];
  color: {
    bg: string;
    border: string;
    text: string;
    iconBg: string;
  };
}

const WELCOME_TEXT = "Hi! I'm Nestira's Help Assistant. I can answer questions about using the platform, billing, candidate management, and more. You can ask me anything or click on the FAQs below for quick answers!";

const HelpCenterBot = () => {
  const ADMIN_ID = 'D9vaCiM22aaRQpxsTxjuz57gKmi1'; // Admin user ID
  const { currentUser } = useAuth();
  const currentUserId = currentUser.uid;

  // Check if current user is admin
  const isAdmin = currentUserId === ADMIN_ID;

  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome-1',
      text: WELCOME_TEXT,
      isBot: true,
      isHuman: false,
      isLocal: true, // هذه رسالة محلية مش متخزنة في الداتابيز
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [hasUserSentMessage, setHasUserSentMessage] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);


  const categorizedFaqs: FAQCategory[] = [
    {
      category: "Getting Started",
      icon: Rocket,
      color: {
        bg: 'bg-blue-50/30',
        border: 'border-blue-600',
        text: 'text-blue-600',
        iconBg: 'bg-blue-100/50'
      },
      faqs: [
        {
          question: "How do I create a job posting?",
          answer: "• Go to Dashboard > 'Create Job Post'.\n• Follow prompts for title, description, and requirements.\n• Use our AI to help write compelling descriptions."
        },
        {
          question: "How do I set up my company profile?",
          answer: "• Navigate to 'Settings' > 'Company Profile'.\n• Fill in company details and culture information.\n• Upload your company logo."
        }
      ]
    },
    {
      category: "Hiring Process",
      icon: Users,
      color: {
        bg: 'bg-green-50/30',
        border: 'border-green-600',
        text: 'text-green-600',
        iconBg: 'bg-green-100/50'
      },
      faqs: [
        {
          question: "How does candidate scoring work?",
          answer: "• Our AI scores candidates from 0-100 based on job match.\n• Key factors: skills, experience, and keyword relevance."
        },
        {
          question: "How do I schedule interviews?",
          answer: "• Go to 'Recruitment Board' > Select a candidate.\n• Click 'Schedule Interview'.\n• Set details, add questions, and invite team members."
        },
        {
          question: "How do I assign assessments to candidates?",
          answer: "• From a candidate's profile, click 'Assign Assessment'.\n• Choose a quiz and confirm.\n• Candidates are notified via email with a link."
        }
      ]
    },
    {
      category: "Billing & Subscription",
      icon: CreditCard,
      color: {
        bg: 'bg-orange-50/30',
        border: 'border-orange-600',
        text: 'text-orange-600',
        iconBg: 'bg-orange-100/50'
      },
      faqs: [
        {
          question: "How do I manage my billing?",
          answer: "• Go to the 'Billing' section to manage your subscription.\n• Actions: upgrade/downgrade, update payment, view invoices."
        },
        {
          question: "What are the available subscription plans?",
          answer: "• We offer multiple plans from Free to Enterprise.\n• View all plan details on the 'Billing' page."
        }
      ]
    },
    {
      category: "Platform Features",
      icon: ClipboardList,
      color: {
        bg: 'bg-purple-50/30',
        border: 'border-purple-600',
        text: 'text-purple-600',
        iconBg: 'bg-purple-100/50'
      },
      faqs: [
        {
          question: "Can I export candidate data?",
          answer: "• Yes, from the 'Talent Pool' page.\n• Select candidates and click 'Export'.\n• Available formats: CSV and PDF."
        },
        {
          question: "What is NestiSign?",
          answer: "• An integrated e-signature tool.\n• Securely send and manage offer letters & documents.\n• Streamlines the final hiring steps."
        }
      ]
    }
  ];


  // Subscribe to real-time messages
  useEffect(() => {
    if (!currentUserId || !ADMIN_ID) return;

    // Mark messages as read when component mounts
    markMessagesAsRead(currentUserId, ADMIN_ID);

    const unsubscribe = subscribeMessages(
      currentUserId,
      ADMIN_ID,
      (firebaseMessages: any[]) => {

        if (firebaseMessages.length === 0 && !hasUserSentMessage) {
          // إذا مفيش رسايل في الداتابيز والمستخدم لسه مبعتهاش
          // نفضل الرسالة الترحيبية المحلية
          setMessages([
            {
              id: 'welcome-1',
              text: WELCOME_TEXT,
              isBot: true,
              isHuman: false,
              isLocal: true,
              timestamp: new Date()
            }
          ]);
          return;
        }

        // Transform Firebase messages to our Message format
        const transformedMessages: Message[] = firebaseMessages.map(msg => ({
          id: msg.id,
          text: msg.message,
          isBot: msg.senderId === ADMIN_ID,
          isHuman: msg.isHuman || false,
          timestamp: new Date(msg.timestamp),
          senderId: msg.senderId
        })).sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime());

        setMessages(transformedMessages);
      }
    );

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, [currentUserId, ADMIN_ID, hasUserSentMessage]);

  // Function to send bot messages (AI responses)
  const sendBotMessage = async (messageText: string) => {
    if (!currentUserId) return;

    try {
      // Always send bot messages as isHuman: false
      await addMessage(ADMIN_ID, currentUserId, messageText, "help", false);
      console.log('Bot message sent successfully!');
    } catch (error: any) {
      console.error('Error sending bot message:', error);
    }
  };

  // Function to send user messages
  const sendUserMessage = async (messageText: string) => {
    if (!currentUserId) return;

    try {
      // رسائل المستخدم دائماً human: true
      await addMessage(currentUserId, ADMIN_ID, messageText, "help", true);
      setHasUserSentMessage(true); //标记用户已发送消息
      console.log('User message sent successfully!');
    } catch (error: any) {
      console.error('Error sending user message:', error);
      alert('Failed to send message. Please try again.');
    }
  };

  // Function to send admin replies manually
  const sendAdminReply = async (messageText: string) => {
    if (!currentUserId || !isAdmin) return;

    try {
      // Admin replies are always human
      await addMessage(ADMIN_ID, currentUserId, messageText, "help", true);
      console.log('Admin reply sent successfully!');
    } catch (error: any) {
      console.error('Error sending admin reply:', error);
    }
  };

  const handleReset = () => {
    setMessages([
      {
        id: `welcome-${Date.now()}`,
        text: WELCOME_TEXT,
        isBot: true,
        isHuman: false,
        isLocal: true,
        timestamp: new Date()
      }
    ]);
    setHasUserSentMessage(false);
    deleteHelpChatForBothUsers(currentUserId, ADMIN_ID);
  };

  const scrollToBottom = () => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleFAQClick = async (faq: FAQ) => {
    // إزالة الرسالة الترحيبية المحلية إذا كانت موجودة
    if (!hasUserSentMessage) {
      setMessages([]);
    }

    // Send user question
    await sendUserMessage(faq.question);

    // Send AI response after a short delay
    setTimeout(async () => {
      await sendBotMessage(faq.answer);
    }, 1000);
  };

  const sendMessage = async () => {
    if (!inputValue.trim() || isLoading || !currentUserId) return;

    try {
      // إزالة الرسالة الترحيبية المحلية إذا كانت موجودة
      if (!hasUserSentMessage) {
        setMessages([]);
      }

      if (isAdmin) {
        // If admin is sending, treat as manual reply
        await sendAdminReply(inputValue.trim());
      } else {
        // If normal user is sending, send question and get AI response
        await sendUserMessage(inputValue.trim());
        setIsLoading(true);

        // Simulate AI response after 1 second
        setTimeout(async () => {
          const botResponse = getBotResponse(inputValue);
          await sendBotMessage(botResponse);
          setIsLoading(false);
        }, 1000);
      }

      setInputValue('');
    } catch (error) {
      console.error('Error in sendMessage:', error);
      setIsLoading(false);
    }
  };

  const getBotResponse = (question: string): string => {
    const lowerQuestion = question.toLowerCase();

    if (lowerQuestion.includes('job') && lowerQuestion.includes('post')) {
      return "• Go to Dashboard > 'Create Job Post'.\n• Follow prompts for title, description, and requirements.\n• Use our AI to help write compelling descriptions.";
    }

    if (lowerQuestion.includes('candidate') && (lowerQuestion.includes('score') || lowerQuestion.includes('scoring'))) {
      return "• Our AI scores candidates from 0-100 based on job match.\n• Key factors: skills, experience, and keyword relevance.";
    }

    if (lowerQuestion.includes('billing') || lowerQuestion.includes('subscription')) {
      return "• Go to the 'Billing' section to manage your subscription.\n• Actions: upgrade/downgrade, update payment, view invoices.";
    }

    if (lowerQuestion.includes('export') || lowerQuestion.includes('download')) {
      return "• Yes, from the 'Talent Pool' page.\n• Select candidates and click 'Export'.\n• Available formats: CSV and PDF.";
    }

    if (lowerQuestion.includes('interview')) {
      return "• Go to 'Recruitment Board' > Select a candidate.\n• Click 'Schedule Interview'.\n• Set details, add questions, and invite team members.";
    }

    return "I am not sure I have an answer for that, but here are some topics I can help with:\n• Creating job posts\n• Candidate scoring\n• Billing & subscriptions\n• Scheduling interviews\nFor more detailed help, please check our knowledge base or contact support.";
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="flex flex-col lg:grid lg:grid-cols-[1fr,auto] gap-6 h-[calc(100vh-200px)] max-h-[800px]">
      {/* Chat Interface - Main Column */}
      <div className="relative z-0 flex flex-col min-h-0">
        <Card className="flex flex-col h-full">
          <CardHeader className={`flex-shrink-0 border-b bg-gradient-to-r from-accent to-orange-600 text-white`}>
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                  <Bot className="w-5 h-5 text-white" />
                </div>
                <div>
                  <span className="font-bold text-lg block">Nestira Help Assistant</span>
                  {isAdmin && (
                    <span className="text-xs text-white/80 block">Admin Mode - Your replies will be marked as human</span>
                  )}
                </div>
              </div>
              <Button variant="ghost" size="icon" onClick={handleReset} className="text-white hover:bg-white/20 hover:text-white">
                <RotateCcw className="w-5 h-5" />
              </Button>
            </CardTitle>
          </CardHeader>

          <CardContent className="flex-1 flex flex-col p-0 min-h-0">
            {/* Chat Messages Area - This will scroll */}
            <ScrollArea className="flex-1 relative">
              <div className="p-4 space-y-4 pb-24">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex items-start gap-3 ${message.isBot ? 'justify-start' : 'justify-end'}`}
                  >
                    {message.isBot && (
                      <div className="w-10 h-10 bg-blue-100/50 rounded-full flex items-center justify-center flex-shrink-0">
                        <Bot className="w-5 h-5 text-blue-600" />
                      </div>
                    )}
                    <div
                      className={`max-w-[80%] rounded-lg p-3 relative ${message.isBot
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-accent text-white ml-auto'
                        }`}
                    >
                      {/* AI Badge for non-human bot messages */}
                      {message.isBot && !message.isHuman && (
                        <div className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
                          <Bot className="w-3 h-3" />
                          AI
                        </div>
                      )}

                      {/* Human Badge for human bot messages (admin) */}
                      {message.isBot && message.isHuman && (
                        <div className="absolute -top-2 -right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
                          <User className="w-3 h-3" />
                          Admin
                        </div>
                      )}

                      {/* Local Message Badge */}
                      {message.isLocal && (
                        <div className="absolute -top-2 -right-2 bg-gray-500 text-white text-xs px-2 py-1 rounded-full">
                          Local
                        </div>
                      )}

                      <p className="text-sm whitespace-pre-line">{message.text}</p>
                      <span className="text-xs opacity-70 mt-1 block">
                        {message.timestamp.toLocaleTimeString([], {
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </span>
                    </div>
                    {!message.isBot && (
                      <div className="w-10 h-10 bg-accent rounded-full flex items-center justify-center flex-shrink-0">
                        <User className="w-6 h-6 text-white" />
                      </div>
                    )}
                  </div>
                ))}
                {isLoading && (
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-blue-100/50 rounded-full flex items-center justify-center">
                      <Bot className="w-5 h-5 text-blue-600" />
                    </div>
                    <div className="bg-blue-100 rounded-lg p-3">
                      <div className="flex gap-1">
                        <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </ScrollArea>

            {/* Fixed Input Bar */}
            <div className="absolute bottom-0 left-0 right-0 z-10 bg-white/80 backdrop-blur-sm border-t p-4">
              <div className="flex gap-2">
                <Input
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder={
                    isAdmin
                      ? "Type your reply as admin..."
                      : "Ask me anything about Nestira..."
                  }
                  disabled={isLoading}
                  className="flex-1"
                />
                <Button onClick={sendMessage} disabled={isLoading || !inputValue.trim()} className='bg-secondary-c'>
                  <Send className="w-5 h-5" />
                </Button>
              </div>
              {isAdmin && (
                <p className="text-xs text-gray-500 mt-2">
                  You are replying as admin - your messages will be marked with "Admin" badge
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* FAQ Quick Actions - Side Column */}
      {!isAdmin && (
        <div className="w-full lg:w-96 flex flex-col min-h-0">
          <Card className="flex flex-col h-full">
            <CardHeader className="flex-shrink-0 border-b">
              <CardTitle className="flex items-center gap-2">
                <HelpCircle className="w-6 h-6 text-accent" />
                <span className="font-bold">Frequently Asked Questions</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="flex-1 p-0 min-h-0">
              <ScrollArea className="h-full">
                <div className="p-4 space-y-2">
                  <Accordion type="multiple" className="w-full space-y-2">
                    {categorizedFaqs.map((categoryItem, categoryIndex) => (
                      <Card key={categoryIndex} className={`shadow-md transition-all duration-200 overflow-hidden border-l-4 ${categoryItem.color.bg} ${categoryItem.color.border} backdrop-blur-sm`}>
                        <AccordionItem value={`category-${categoryIndex}`} className="border-b-0">
                          <AccordionTrigger className="p-4 hover:no-underline">
                            <div className="flex items-center gap-3">
                              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${categoryItem.color.iconBg}`}>
                                <categoryItem.icon className={`w-5 h-5 ${categoryItem.color.text}`} />
                              </div>
                              <span className="font-semibold text-base text-gray-800">{categoryItem.category}</span>
                            </div>
                          </AccordionTrigger>
                          <AccordionContent className="pb-0">
                            <div className="pl-4 pr-4 pb-2">
                              <Accordion type="single" collapsible className="w-full">
                                {categoryItem.faqs.map((faq, faqIndex) => (
                                  <AccordionItem key={faqIndex} value={`faq-${categoryIndex}-${faqIndex}`} className="border-t">
                                    <AccordionTrigger
                                      className="text-left hover:no-underline py-3"
                                      onClick={() => handleFAQClick(faq)}
                                    >
                                      <div className="flex items-center gap-2">
                                        <HelpCircle className="w-5 h-5 text-gray-400 flex-shrink-0" />
                                        <span className="text-sm font-medium text-gray-700">{faq.question}</span>
                                      </div>
                                    </AccordionTrigger>
                                    <AccordionContent>
                                      <div className="pl-[2.4rem] pb-3 text-sm text-gray-600 whitespace-pre-line">
                                        {faq.answer}
                                      </div>
                                    </AccordionContent>
                                  </AccordionItem>
                                ))}
                              </Accordion>
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                      </Card>
                    ))}
                  </Accordion>
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </div>
      )}
    </div>

  );
};

export default HelpCenterBot;