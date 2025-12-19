// import React from 'react'
// import { Button } from '../ui/button'
// import { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuLink } from "../ui/navigation-menu"
// import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet"
// import { Menu } from "lucide-react"
// import { Link } from 'react-router-dom';
// import logo from '@/assets/56e3e265-35c1-4968-86ec-2a6c964c97ad.png';

// export const NavLinks = [
//     // { label: 'Home', navTo: '/' },
//     // { label: 'Jobs', navTo: '/jobs' },
//     // { label: 'About', navTo: '/about' },
//     // { label: 'Contact', navTo: '/contact' },

// ]


// const Header = () => {
//     return (
//         <header className="flex justify-between items-center px-6 py-4 shadow-sm border-b bg-secondary-c-hover">
//             {/* Logo */}
//             <div>
//                 <img src={logo} alt='Nestira' width={200} loading='lazy' />
//             </div>

//             {/* Desktop Navigation */}
//             {/* <NavigationMenu className="hidden md:flex">
//                 <NavigationMenuList>
//                     {NavLinks.map((link, i) => (
//                         <NavigationMenuLink
//                             key={i}
//                             href={link.navTo}
//                             className="px-3 flex flex-col items-center text-white hover:text-secondary-c transition-colors duration-300 group/link"
//                         >
//                             <span>{link.label}</span>
//                             <hr
//                                 className="h-[3px] bg-secondary-c rounded-full w-0 transition-all duration-300 group-hover/link:w-full outline-none border-none"
//                             />
//                         </NavigationMenuLink>

//                     ))}

//                 </NavigationMenuList>
//             </NavigationMenu> */}


//             {/* Buttons */}
//             <div className="flex gap-3">
//                 <Button variant="outline">   <Link to='/login'>Login</Link></Button>
//                 {/* <Button variant="ghost">Sign Up</Button> */}
//             </div>

//             {/* Mobile Menu */}
//             {/* <Sheet>
//                 <SheetTrigger asChild>
//                     <Button variant="ghost" size="icon" className="md:hidden">
//                         <Menu className="h-5 w-5" />
//                     </Button>
//                 </SheetTrigger>
//                 <SheetContent side="right" className="w-[250px]">
//                     <nav className="flex flex-col gap-4 mt-8">
//                         {NavLinks.map((link, i) => (
//                             <Link
//                                 key={i}
//                                 to={link.navTo}
//                                 className="px-3 flex flex-col items-center text-muted-foreground hover:text-secondary-c transition-colors duration-300 group/link"

//                             >
//                                 <span>{link.label}</span>
//                                 <hr
//                                     className="h-[3px] bg-secondary-c rounded-full w-0 transition-all duration-300 group-hover/link:w-full"
//                                 />
//                             </Link>
//                         ))}
//                         <Button className="mt-4">Sign Up</Button>
//                     </nav>
//                 </SheetContent>
//             </Sheet> */}
//         </header>
//     )
// }

// export default Header
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import logo from '@/assets/nestira-logo.png';

const Header = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'Jobs', href: '#jobs' },
        { name: 'For Employers', href: '#employers' },
        { name: 'For Candidates', href: '#candidates' },
        { name: 'How It Works', href: '#how-it-works' },
        { name: 'Pricing', href: '#pricing' },
        { name: 'About', href: '#about' },
    ];

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
                ? 'bg-navy/95 backdrop-blur-md shadow-lg'
                : 'bg-transparent'
                }`}
        >
            <div className="container mx-auto container-padding">
                <div className="flex items-center justify-between h-20">
                    {/* Logo */}
                    <a href="#" className="flex items-center">
                        <img src={logo} alt="Nestira Finance" className="h-10 w-auto" />
                    </a>

                    {/* Desktop Navigation */}
                    <nav className="hidden lg:flex items-center gap-8">
                        {navLinks.map((link) => (
                            <a
                                key={link.name}
                                href={link.href}
                                className="text-primary-foreground/80 hover:text-primary-foreground font-medium transition-colors duration-200"
                            >
                                {link.name}
                            </a>
                        ))}
                    </nav>

                    {/* Desktop CTAs */}
                    <div className="hidden lg:flex items-center gap-4">

                        {/* <a href="#contact"  className=" btn-outline text-sm py-2.5 px-5">
              Contact Us
            </a>
            <a href="#get-started" className="btn-primary text-sm py-2.5 px-5">
              Get Started
            </a> */}
                        <a href="#contact" className=" btn-outline text-sm py-2.5 px-5">
                            Contact Us
                        </a>
                        <a href="/login" className="btn-primary text-sm py-2.5 px-5">
                            Get Started
                        </a>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="lg:hidden p-2 text-primary-foreground"
                        aria-label="Toggle menu"
                    >
                        {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>

                {/* Mobile Menu */}
                {isMobileMenuOpen && (
                    <div className="lg:hidden bg-navy border-t border-primary-foreground/10 animate-fade-in">
                        <nav className="flex flex-col py-4">
                            {navLinks.map((link) => (
                                <a
                                    key={link.name}
                                    href={link.href}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="text-primary-foreground/80 hover:text-primary-foreground font-medium py-3 px-4 transition-colors duration-200"
                                >
                                    {link.name}
                                </a>
                            ))}
                            <div className="flex flex-col gap-3 mt-4 px-4">
                                <a href="#contact" className="btn-outline text-center">
                                    Contact Us
                                </a>
                                <a href="#get-started" className="btn-primary text-center">
                                    Get Started
                                </a>
                            </div>
                        </nav>
                    </div>
                )}
            </div>
        </header>
    );
};

export default Header;
