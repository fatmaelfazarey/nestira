// import { Separator } from "@/components/ui/separator"
// import { Facebook, Twitter, Linkedin, Github } from "lucide-react"
// import logo from '@/assets/56e3e265-35c1-4968-86ec-2a6c964c97ad.png';
// import {NavLinks} from './Header'
// import { Link } from "react-router-dom";

// export default function Footer() {
//     return (

//               <footer className="bg-secondary-c border-solid border-t-[12px] border-t-orange-700 rounded-tr-3xl rounded-tl-3xl">
//             {/* Main footer content */}
//             {/* <div className=" pt-8 px-4 mx-auto flex flex-col items-start justify-between gap-8 md:flex-row text-white"> */}
//                 {/* Left section: Logo and short description */}
//                 <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 py-8 px-4 text-white">
//                     <img
//                         alt="logo"
//                         loading="lazy"
//                         width="250"
//                         height="48"
//                         decoding="async"
//                         style={{ color: "transparent" }}
//                         src={logo}
//                     />
//                 <p>© 2025 Nestira. All rights reserved.</p>
//                 </div>

            
//             {/* </div> */}

         
//         </footer>
//         // <footer className="bg-secondary-c border-solid border-t-[31px] border-t-orange-700">
//         //     {/* Main footer content */}
//         //     <div className=" pt-8 px-4 mx-auto flex flex-col items-start justify-between gap-8 md:flex-row text-white">
//         //         {/* Left section: Logo and short description */}
//         //         <div className="flex flex-col gap-4 max-w-md">
//         //             <img
//         //                 alt="logo"
//         //                 loading="lazy"
//         //                 width="250"
//         //                 height="48"
//         //                 decoding="async"
//         //                 style={{ color: "transparent" }}
//         //                 src={logo}
//         //             />
//         //             <h3 className="text-2xl font-semibold">Get in touch with us</h3>
//         //             <p className="text-sm text-[#B1B1B1] leading-relaxed">
//         //                 Stay up to date with the latest finance job trends, discounts, and
//         //                 special events. <br />
//         //                 You can unsubscribe at any time with just one click.
//         //             </p>
//         //         </div>

//         //         {/* Right section: Links */}
//         //         <div className="grid w-full grid-cols-1 gap-7 md:gap-4 sm:grid-cols-2 md:grid-cols-3">
//         //             {/* About section links */}
//         //             <div className="grid md:justify-center gap-5 self-start">
//         //                 <h4 className="font-normal text-white text-lg">About</h4>
//         //                 <div className="flex flex-col gap-2">
//         //                     {NavLinks.map((link, i) => (
//         //                         <Link to={link.navTo} key={i} 
//         //                         className="text-[#B1B1B1] hover:text-opacity-60"
//         //                         >{link.label}</Link>

//         //                     ))}

                        
//         //                 </div>
//         //             </div>

//         //             {/* Support section links */}
//         //             <div className="grid md:justify-center gap-5 self-start">
//         //                 <h4 className="font-normal text-white text-lg">Support</h4>
//         //                 <div className="flex flex-col gap-2">
//         //                     <a
//         //                         className="text-[#B1B1B1] hover:text-opacity-60"
//         //                         href="/contact"
//         //                     >
//         //                         Contact us
//         //                     </a>
//         //                 </div>
//         //             </div>
//         //         </div>
//         //     </div>

//         //     {/* Bottom footer */}
//         //     <div className="mt-8  mx-auto px-4 border-t border-t-[#B8B8B8] py-4 text-white font-medium">
//         //         <p>© 2025 Nestira. All rights reserved.</p>
//         //     </div>
//         // </footer>
//     )
// }



import { Linkedin, Twitter, Facebook, Instagram, Mail, Phone, MapPin } from 'lucide-react';
import logo from '@/assets/nestira-logo.png';

const Footer = () => {
  const footerLinks = {
    company: [
      { name: 'About Us', href: '#about' },
      { name: 'Careers', href: '#' },
      { name: 'Press', href: '#' },
      { name: 'Blog', href: '#' },
    ],
    employers: [
      { name: 'Post a Job', href: '#' },
      { name: 'Search Candidates', href: '#' },
      { name: 'Pricing', href: '#' },
      { name: 'Enterprise', href: '#' },
    ],
    candidates: [
      { name: 'Browse Jobs', href: '#' },
      { name: 'Skill Assessments', href: '#' },
      { name: 'Career Resources', href: '#' },
      { name: 'Salary Guide', href: '#' },
    ],
    legal: [
      { name: 'Privacy Policy', href: '#' },
      { name: 'Terms of Service', href: '#' },
      { name: 'Cookie Policy', href: '#' },
    ],
  };

  const socialLinks = [
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Instagram, href: '#', label: 'Instagram' },
  ];

  return (
    <footer id="contact" className="bg-navy pt-16 pb-8">
      <div className="container mx-auto container-padding">
        {/* Main Footer Content */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 pb-12 border-b border-primary-foreground/10">
          {/* Brand Column */}
          <div className="col-span-2">
            <img src={logo} alt="Nestira Finance" className="h-10 w-auto mb-4" />
            <p className="text-primary-foreground/60 mb-6 max-w-xs">
              The leading hiring platform for finance and accounting professionals in Egypt and the GCC.
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="w-10 h-10 bg-primary-foreground/10 rounded-lg flex items-center justify-center hover:bg-accent transition-colors"
                >
                  <social.icon className="w-5 h-5 text-primary-foreground" />
                </a>
              ))}
            </div>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold text-primary-foreground mb-4">Company</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <a href={link.href} className="text-primary-foreground/60 hover:text-accent transition-colors">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Employers */}
          <div>
            <h4 className="font-semibold text-primary-foreground mb-4">Employers</h4>
            <ul className="space-y-3">
              {footerLinks.employers.map((link) => (
                <li key={link.name}>
                  <a href={link.href} className="text-primary-foreground/60 hover:text-accent transition-colors">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Candidates */}
          <div>
            <h4 className="font-semibold text-primary-foreground mb-4">Candidates</h4>
            <ul className="space-y-3">
              {footerLinks.candidates.map((link) => (
                <li key={link.name}>
                  <a href={link.href} className="text-primary-foreground/60 hover:text-accent transition-colors">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-primary-foreground mb-4">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-primary-foreground/60">
                <Mail className="w-4 h-4" />
                <span>hello@nestira.com</span>
              </li>
              <li className="flex items-center gap-2 text-primary-foreground/60">
                <Phone className="w-4 h-4" />
                <span>+20 123 456 789</span>
              </li>
              <li className="flex items-start gap-2 text-primary-foreground/60">
                <MapPin className="w-4 h-4 shrink-0 mt-1" />
                <span>Cairo, Egypt & Dubai, UAE</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-primary-foreground/40 text-sm">
            © {new Date().getFullYear()} Nestira Finance. All rights reserved.
          </p>
          <div className="flex gap-6">
            {footerLinks.legal.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-primary-foreground/40 text-sm hover:text-accent transition-colors"
              >
                {link.name}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
