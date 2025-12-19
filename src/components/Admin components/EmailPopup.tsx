import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { toast } from 'sonner';
import { Mail, Send, X } from 'lucide-react';
import { useAdminStore } from '@/store/Admin store/AdminStore';
// import { sendCandidateEmail } from '@/services/cadidatesService';

interface EmailPopupProps {
    candidate: {
        id: string;
        email: string;
        basicInfo: {
            fullName: string;
        };
    };
    isOpen: boolean;
    onClose: () => void;
    onEmailSent?: () => void;
}

export const EmailPopup: React.FC<EmailPopupProps> = ({
    candidate,
    isOpen,
    onClose,
    onEmailSent
}) => {
    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const { sendCandidateEmail } = useAdminStore();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!subject.trim()) {
            toast.error('Please enter a subject');
            return;
        }

        if (!message.trim()) {
            toast.error('Please enter a message');
            return;
        }

        setLoading(true);

        try {
            await sendCandidateEmail(candidate.id, {
                subject,
                message,
                recipientEmail: candidate.email,
                recipientName: candidate.basicInfo.fullName
            });

            toast.success('Email sent successfully');

            // Reset form
            setSubject('');
            setMessage('');

            // Call callback if provided
            if (onEmailSent) {
                onEmailSent();
            }

            // Close popup
            onClose();

        } catch (error: any) {
            console.error('Error sending email:', error);
            toast.error(error.message || 'Failed to send email');
        } finally {
            setLoading(false);
        }
    };

    const handleClose = () => {
        setSubject('');
        setMessage('');
        onClose();
    };

    return (
        <Dialog open={isOpen} onOpenChange={handleClose}>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                        <Mail className="w-5 h-5" />
                        Send Email
                    </DialogTitle>
                    <DialogDescription>
                        Send an email to {candidate.basicInfo.fullName} ({candidate.email})
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit}>
                    <div className="space-y-4 py-4">
                        <div className="space-y-2">
                            <Label htmlFor="subject">Subject</Label>
                            <Input
                                id="subject"
                                value={subject}
                                onChange={(e) => setSubject(e.target.value)}
                                placeholder="Enter email subject"
                                disabled={loading}
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="message">Message</Label>
                            <Textarea
                                id="message"
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                placeholder="Type your message here..."
                                rows={6}
                                disabled={loading}
                            />
                        </div>
                    </div>

                    <div className="flex justify-end gap-2 pt-2">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={handleClose}
                            disabled={loading}
                        >
                            <X className="w-4 h-4 mr-2" />
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            disabled={loading}
                        >
                            {loading ? (
                                <>
                                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                                    Sending...
                                </>
                            ) : (
                                <>
                                    <Send className="w-4 h-4 mr-2" />
                                    Send Email
                                </>
                            )}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default EmailPopup;