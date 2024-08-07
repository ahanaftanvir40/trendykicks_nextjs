"use client"
import React, { useState } from "react";
import { HoveredLink, Menu, MenuItem, ProductItem } from "./ui/navbar-menu";
import { cn } from "../utils/cn";
import Link from "next/link";
import { useSession } from "next-auth/react";





function NavBar({ className }: { className?: string }) {


    const { data: session, status } = useSession()
    console.log("session: ", session?.user);


    const [active, setActive] = useState<string | null>(null);
    return (
        <div className={cn("fixed top-10 inset-x-0 max-w-2xl mx-auto z-50", className)}>

            <Menu setActive={setActive}>
                <Link href={"/"}>
                    <MenuItem setActive={setActive} active={active} item="Home">

                    </MenuItem>
                </Link>
                <MenuItem setActive={setActive} active={active} item="Kicks">
                    <div className="flex flex-col space-y-4 text-sm">
                        <HoveredLink href='/products'>All Products</HoveredLink>


                    </div>

                </MenuItem>
                <Link href='/contact'>
                    <MenuItem setActive={setActive} active={active} item="Contact Us">
                    </MenuItem>
                </Link>
                {session && session.user.isAdmin && (
                    <MenuItem setActive={setActive} active={active} item="Admin Panel">
                        <div className="flex flex-col space-y-4 text-sm">
                            <HoveredLink href='/adminpanel/add'>Add Products</HoveredLink>
                            <HoveredLink href='/adminpanel'>Manage Products</HoveredLink>
                            <HoveredLink href='/orders'>Orders</HoveredLink>
                            <HoveredLink href='/products'>Users</HoveredLink>

                        </div>

                    </MenuItem>
                )}





            </Menu>

        </div>
    )
}

export default NavBar