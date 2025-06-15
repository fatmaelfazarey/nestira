
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from "sonner";
import { Briefcase } from 'lucide-react';

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
        <div className="p-6 rounded-xl bg-primary text-primary-foreground border-accent/20 border shadow-lg relative overflow-hidden">
             <div className="absolute -top-10 -right-10 w-32 h-32 bg-accent/30 rounded-full opacity-60"></div>
             <div className="absolute top-16 -left-12 w-40 h-40 bg-accent/30 rounded-full opacity-60"></div>
             <div className="relative z-10">
                <div className="flex items-center gap-3 mb-3">
                    <div className="bg-accent/20 p-2 rounded-lg">
                        <Briefcase className="w-5 h-5 text-accent" />
                    </div>
                    <h3 className="text-lg font-bold">What top finance teams are reading.</h3>
                </div>
                
                <p className="text-sm text-slate-300 mb-5">
                    Join thousands of decision-makers getting hiring trends, salary insights, and smart recruiting tips — straight to their inbox.
                </p>
                <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2">
                    <Input 
                        type="email" 
                        placeholder="Your email address" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="flex-grow bg-white/20 border-white/30 placeholder:text-slate-400 focus:bg-white/20 ring-offset-primary focus:ring-accent text-base"
                        aria-label="Email for newsletter"
                    />
                    <Button type="submit" variant="default" className="bg-accent text-accent-foreground hover:bg-accent/90 shrink-0">Subscribe</Button>
                </form>
                <p className="text-xs text-slate-400 mt-3">
                    Actionable data. No noise. Easy opt-out.
                </p>
            </div>
        </div>
    );
};

export default NewsletterSubscription;
