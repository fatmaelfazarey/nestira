
import { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Bot, Send, User, HelpCircle, Rocket, Users, CreditCard, ClipboardList } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: Date;
}

interface FAQ {
  question: string;
  answer: string;
}

interface FAQCategory {
  category: string;
  icon: React.ElementType;
  faqs: FAQ[];
}

const HelpCenterBot = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hi! I'm Nestira's Help Assistant. I can answer questions about using the platform, billing, candidate management, and more. You can ask me anything or click on the FAQs below for quick answers!",
      isBot: true,
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const categorizedFaqs: FAQCategory[] = [
    {
      category: "Getting Started",
      icon: Rocket,
      faqs: [
        {
          question: "How do I create a job posting?",
          answer: "To create a job posting, go to your dashboard and click 'Create Job Post'. You'll be guided through setting the job title, description, requirements, and application process. The AI can help generate compelling job descriptions based on your inputs."
        },
        {
          question: "How do I set up my company profile?",
          answer: "You can set up your company profile in the 'Settings' section. Fill in your company details, upload a logo, and provide information about your culture to attract the right candidates."
        }
      ]
    },
    {
      category: "Hiring Process",
      icon: Users,
      faqs: [
        {
          question: "How does candidate scoring work?",
          answer: "Nestira's AI scoring system evaluates candidates based on their skills, experience, and how well they match your job requirements. Scores range from 0-100, with factors including keyword matching, experience relevance, and skill alignment."
        },
        {
          question: "How do I schedule interviews?",
          answer: "To schedule interviews, go to your Recruitment Board, select a candidate, and click 'Schedule Interview'. You can set date/time, add interview questions, invite team members, and send calendar invitations automatically."
        },
        {
          question: "How do I assign assessments to candidates?",
          answer: "You can assign assessments from the candidate profile or recruitment board. Click 'Assign Assessment', select from available quizzes, and confirm. Candidates will receive email notifications with assessment links."
        }
      ]
    },
    {
      category: "Billing & Subscription",
      icon: CreditCard,
      faqs: [
        {
          question: "How do I manage my billing?",
          answer: "You can manage your billing and subscription in the Billing section. Here you can upgrade/downgrade plans, view usage, update payment methods, and download invoices. Contact support for billing disputes or questions."
        },
        {
          question: "What are the available subscription plans?",
          answer: "We offer several subscription plans to fit your needs, from a free plan for basic use to enterprise solutions. You can see all plan details and features on our Billing page."
        }
      ]
    },
    {
      category: "Platform Features",
      icon: ClipboardList,
      faqs: [
        {
          question: "Can I export candidate data?",
          answer: "You can export candidate data from the Talent Pool page using the export feature. Available formats include CSV and PDF. Go to Talent Pool > Select candidates > Export button."
        },
        {
          question: "What is NestiSign?",
          answer: "NestiSign is our integrated e-signature tool that allows you to send and manage offer letters and other documents securely within the platform, streamlining your final hiring steps."
        }
      ]
    }
  ];

  const scrollToBottom = () => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleFAQClick = (faq: FAQ) => {
    const userMessage: Message = {
      id: `user-${Date.now()}`,
      text: faq.question,
      isBot: false,
      timestamp: new Date()
    };

    const botMessage: Message = {
      id: `bot-${Date.now()}`,
      text: faq.answer,
      isBot: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage, botMessage]);
  };

  const sendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      text: inputValue,
      isBot: false,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    setTimeout(() => {
      const botMessage: Message = {
        id: `bot-${Date.now() + 1}`,
        text: getBotResponse(inputValue),
        isBot: true,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMessage]);
      setIsLoading(false);
    }, 1000);
  };

  const getBotResponse = (question: string): string => {
    const lowerQuestion = question.toLowerCase();
    
    if (lowerQuestion.includes('job') && lowerQuestion.includes('post')) {
      return "To create a job posting, go to your dashboard and click 'Create Job Post'. You'll be guided through setting the job title, description, requirements, and application process. The AI can help generate compelling job descriptions based on your inputs.";
    }
    
    if (lowerQuestion.includes('candidate') && (lowerQuestion.includes('score') || lowerQuestion.includes('scoring'))) {
      return "Nestira's AI scoring system evaluates candidates based on their skills, experience, and how well they match your job requirements. Scores range from 0-100, with factors including keyword matching, experience relevance, and skill alignment.";
    }
    
    if (lowerQuestion.includes('billing') || lowerQuestion.includes('subscription')) {
      return "You can manage your billing and subscription in the Billing section. Here you can upgrade/downgrade plans, view usage, update payment methods, and download invoices. Contact support for billing disputes or questions.";
    }
    
    if (lowerQuestion.includes('export') || lowerQuestion.includes('download')) {
      return "You can export candidate data from the Talent Pool page using the export feature. Available formats include CSV and PDF. Go to Talent Pool > Select candidates > Export button.";
    }
    
    if (lowerQuestion.includes('interview')) {
      return "To schedule interviews, go to your Recruitment Board, select a candidate, and click 'Schedule Interview'. You can set date/time, add interview questions, invite team members, and send calendar invitations automatically.";
    }
    
    return "I understand you're asking about that topic. For detailed assistance, please check our knowledge base articles or contact our support team directly. Is there a specific feature or process you'd like help with?";
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
      <div className="relative z-0">
        <Card className="h-full flex flex-col">
          <CardHeader className="flex-shrink-0 border-b bg-gradient-to-r from-primary to-slate-800 text-white">
            <CardTitle className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <Bot className="w-6 h-6 text-white" />
              </div>
              <span className="font-bold text-lg">Nestira Help Assistant</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="flex-1 flex flex-col p-0 relative">
            {/* Chat Messages Area */}
            <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
              <div className="space-y-4 pb-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex items-start gap-3 ${
                      message.isBot ? 'justify-start' : 'justify-end'
                    }`}
                  >
                    {message.isBot && (
                      <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                        <Bot className="w-4 h-4 text-primary" />
                      </div>
                    )}
                    <div
                      className={`max-w-[80%] rounded-lg p-3 ${
                        message.isBot
                          ? 'bg-gray-100 text-gray-900'
                          : 'bg-primary text-white ml-auto'
                      }`}
                    >
                      <p className="text-sm">{message.text}</p>
                      <span className="text-xs opacity-70 mt-1 block">
                        {message.timestamp.toLocaleTimeString([], { 
                          hour: '2-digit', 
                          minute: '2-digit' 
                        })}
                      </span>
                    </div>
                    {!message.isBot && (
                      <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                        <User className="w-4 h-4 text-white" />
                      </div>
                    )}
                  </div>
                ))}
                {isLoading && (
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                      <Bot className="w-4 h-4 text-primary" />
                    </div>
                    <div className="bg-gray-100 rounded-lg p-3">
                      <div className="flex gap-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </ScrollArea>
            
            {/* Fixed Input Bar */}
            <div className="absolute bottom-0 left-0 right-0 z-10 bg-white border-t p-4">
              <div className="flex gap-2">
                <Input
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask me anything about Nestira..."
                  disabled={isLoading}
                  className="flex-1"
                />
                <Button onClick={sendMessage} disabled={isLoading || !inputValue.trim()}>
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* FAQ Quick Actions - Side Column */}
      <div className="w-full lg:w-96 relative z-0">
        <Card className="h-full">
          <CardHeader className="flex-shrink-0 border-b">
            <CardTitle className="flex items-center gap-2">
              <HelpCircle className="w-6 h-6 text-accent" />
              <span className="font-bold">Frequently Asked Questions</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0 h-full">
            <ScrollArea className="h-[calc(100%-80px)]">
              <div className="p-4 space-y-2">
                <Accordion type="multiple" className="w-full space-y-2">
                  {categorizedFaqs.map((categoryItem, categoryIndex) => (
                    <Card key={categoryIndex} className="bg-white/80 border-gray-200/60 shadow-sm transition-all duration-200 overflow-hidden">
                        <AccordionItem value={`category-${categoryIndex}`} className="border-b-0">
                            <AccordionTrigger className="p-4 hover:no-underline">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                                        <categoryItem.icon className="w-5 h-5 text-primary" />
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
                                              <HelpCircle className="w-4 h-4 text-gray-400 flex-shrink-0" />
                                              <span className="text-sm font-medium text-gray-700">{faq.question}</span>
                                            </div>
                                          </AccordionTrigger>
                                          <AccordionContent>
                                            <div className="pl-[2.1rem] pb-3 text-sm text-gray-600">
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
    </div>
  );
};

export default HelpCenterBot;
