import React from 'react'
import { Button } from '../ui/button'
import { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuLink } from "../ui/navigation-menu"
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet"
import { Menu } from "lucide-react"
import { Link } from 'react-router-dom';
import logo from '@/assets/56e3e265-35c1-4968-86ec-2a6c964c97ad.png';

export const NavLinks = [
    // { label: 'Home', navTo: '/' },
    // { label: 'Jobs', navTo: '/jobs' },
    // { label: 'About', navTo: '/about' },
    // { label: 'Contact', navTo: '/contact' },

]


const Header = () => {
    return (
        <header className="flex justify-between items-center px-6 py-4 shadow-sm border-b bg-secondary-c-hover">
            {/* Logo */}
            <div>
                <img src={logo} alt='Nestira' width={200} loading='lazy' />
            </div>

            {/* Desktop Navigation */}
            {/* <NavigationMenu className="hidden md:flex">
                <NavigationMenuList>
                    {NavLinks.map((link, i) => (
                        <NavigationMenuLink
                            key={i}
                            href={link.navTo}
                            className="px-3 flex flex-col items-center text-white hover:text-secondary-c transition-colors duration-300 group/link"
                        >
                            <span>{link.label}</span>
                            <hr
                                className="h-[3px] bg-secondary-c rounded-full w-0 transition-all duration-300 group-hover/link:w-full outline-none border-none"
                            />
                        </NavigationMenuLink>

                    ))}

                </NavigationMenuList>
            </NavigationMenu> */}


            {/* Buttons */}
            <div className="flex gap-3">
                <Button variant="outline">   <Link to='/login'>Login</Link></Button>
                {/* <Button variant="ghost">Sign Up</Button> */}
            </div>

            {/* Mobile Menu */}
            {/* <Sheet>
                <SheetTrigger asChild>
                    <Button variant="ghost" size="icon" className="md:hidden">
                        <Menu className="h-5 w-5" />
                    </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-[250px]">
                    <nav className="flex flex-col gap-4 mt-8">
                        {NavLinks.map((link, i) => (
                            <Link
                                key={i}
                                to={link.navTo}
                                className="px-3 flex flex-col items-center text-muted-foreground hover:text-secondary-c transition-colors duration-300 group/link"

                            >
                                <span>{link.label}</span>
                                <hr
                                    className="h-[3px] bg-secondary-c rounded-full w-0 transition-all duration-300 group-hover/link:w-full"
                                />
                            </Link>
                        ))}
                        <Button className="mt-4">Sign Up</Button>
                    </nav>
                </SheetContent>
            </Sheet> */}
        </header>
    )
}

export default Header
