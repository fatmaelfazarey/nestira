
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from "sonner";

const NewsletterSubscription = () => {
    const [email, setEmail] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (email && /^\S+@\S+\.\S+$/.test(email)) {
            toast.success("Subscribed!", { description: "Thanks for joining! Keep an eye on your inbox for the latest insights." });
            setEmail('');
        } else {
            toast.error("Oops!", { description: "Please enter a valid email address." });
        }
    };

    return (
        <div className="p-6 rounded-lg bg-slate-50 border border-slate-200 dark:bg-slate-800/50 dark:border-slate-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">💼 What top finance teams are reading.</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                Join thousands of decision-makers getting hiring trends, salary insights, and smart recruiting tips — straight to their inbox.
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-500 mb-4">
                Actionable data. No noise. Easy opt-out.
            </p>
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2">
                <Input 
                    type="email" 
                    placeholder="Your email address" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="flex-grow"
                    aria-label="Email for newsletter"
                />
                <Button type="submit">Subscribe</Button>
            </form>
        </div>
    );
};

export default NewsletterSubscription;
