
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
        <div className="p-8 rounded-2xl bg-primary text-primary-foreground border-accent/10 border shadow-2xl relative overflow-hidden">
             <div className="absolute -top-10 -right-10 w-40 h-40 bg-black/20 rounded-full"></div>
             <div className="absolute top-10 -left-10 w-56 h-56 bg-black/20 rounded-full"></div>
             <div className="relative z-10">
                <div className="flex items-center gap-3 mb-4">
                    <div className="bg-black/20 p-3 rounded-lg">
                        <Briefcase className="w-5 h-5 text-accent" />
                    </div>
                    <h3 className="text-xl font-bold max-w-[300px]">What top finance teams are reading.</h3>
                </div>
                
                <p className="text-sm text-slate-300 mb-6 max-w-md">
                    Join thousands of decision-makers getting hiring trends, salary insights, and smart recruiting tips — straight to their inbox.
                </p>
                <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
                    <Input 
                        type="email" 
                        placeholder="Your email address" 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="flex-grow bg-black/20 border-white/20 placeholder:text-slate-400 focus:bg-black/30 ring-offset-primary focus:ring-accent text-base"
                        aria-label="Email for newsletter"
                    />
                    <Button type="submit" variant="default" className="bg-accent text-accent-foreground hover:bg-accent/90 shrink-0 text-base font-medium">Subscribe</Button>
                </form>
                <p className="text-xs text-slate-400 mt-4">
                    Actionable data. No noise. Easy opt-out.
                </p>
            </div>
        </div>
    );
};

export default NewsletterSubscription;
