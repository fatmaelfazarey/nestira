import { Separator } from "@/components/ui/separator"
import { Facebook, Twitter, Linkedin, Github } from "lucide-react"
import logo from '@/assets/56e3e265-35c1-4968-86ec-2a6c964c97ad.png';
import {NavLinks} from './Header'
import { Link } from "react-router-dom";

export default function Footer() {
    return (

              <footer className="bg-secondary-c border-solid border-t-[12px] border-t-orange-700 rounded-tr-3xl rounded-tl-3xl">
            {/* Main footer content */}
            {/* <div className=" pt-8 px-4 mx-auto flex flex-col items-start justify-between gap-8 md:flex-row text-white"> */}
                {/* Left section: Logo and short description */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 py-8 px-4 text-white">
                    <img
                        alt="logo"
                        loading="lazy"
                        width="250"
                        height="48"
                        decoding="async"
                        style={{ color: "transparent" }}
                        src={logo}
                    />
                <p>© 2025 Nestira. All rights reserved.</p>
                </div>

            
            {/* </div> */}

         
        </footer>
        // <footer className="bg-secondary-c border-solid border-t-[31px] border-t-orange-700">
        //     {/* Main footer content */}
        //     <div className=" pt-8 px-4 mx-auto flex flex-col items-start justify-between gap-8 md:flex-row text-white">
        //         {/* Left section: Logo and short description */}
        //         <div className="flex flex-col gap-4 max-w-md">
        //             <img
        //                 alt="logo"
        //                 loading="lazy"
        //                 width="250"
        //                 height="48"
        //                 decoding="async"
        //                 style={{ color: "transparent" }}
        //                 src={logo}
        //             />
        //             <h3 className="text-2xl font-semibold">Get in touch with us</h3>
        //             <p className="text-sm text-[#B1B1B1] leading-relaxed">
        //                 Stay up to date with the latest finance job trends, discounts, and
        //                 special events. <br />
        //                 You can unsubscribe at any time with just one click.
        //             </p>
        //         </div>

        //         {/* Right section: Links */}
        //         <div className="grid w-full grid-cols-1 gap-7 md:gap-4 sm:grid-cols-2 md:grid-cols-3">
        //             {/* About section links */}
        //             <div className="grid md:justify-center gap-5 self-start">
        //                 <h4 className="font-normal text-white text-lg">About</h4>
        //                 <div className="flex flex-col gap-2">
        //                     {NavLinks.map((link, i) => (
        //                         <Link to={link.navTo} key={i} 
        //                         className="text-[#B1B1B1] hover:text-opacity-60"
        //                         >{link.label}</Link>

        //                     ))}

                        
        //                 </div>
        //             </div>

        //             {/* Support section links */}
        //             <div className="grid md:justify-center gap-5 self-start">
        //                 <h4 className="font-normal text-white text-lg">Support</h4>
        //                 <div className="flex flex-col gap-2">
        //                     <a
        //                         className="text-[#B1B1B1] hover:text-opacity-60"
        //                         href="/contact"
        //                     >
        //                         Contact us
        //                     </a>
        //                 </div>
        //             </div>
        //         </div>
        //     </div>

        //     {/* Bottom footer */}
        //     <div className="mt-8  mx-auto px-4 border-t border-t-[#B8B8B8] py-4 text-white font-medium">
        //         <p>© 2025 Nestira. All rights reserved.</p>
        //     </div>
        // </footer>
    )
}
