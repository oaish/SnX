"use client"

import React, {useEffect} from 'react'
import Nav from "@/components/Nav";
import {usePathname} from "next/navigation";
import Footer from "@/components/Footer";
import {NextUIProvider} from "@nextui-org/react";
import useAppStore from "@/states/appState";

const IsNavFooter = ({children}) => {
    const pathname = usePathname();
    const isLoginPage = pathname.includes("/auth");
    const isCreatePage = pathname.includes("/create")
    const isAccountPage = pathname.includes("/account");

    const {setUser} = useAppStore();

    useEffect(() => {
        if (!isLoginPage && !isCreatePage && !isAccountPage) {
            fetch('/api/get/user/profile', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({email: localStorage.getItem("user")})
            })
                .then(res => res.json())
                .then(data => {
                    setUser(data.currentUser)
                })
        }

        window.addEventListener('beforeunload', function (e) {
            e.preventDefault();
            e.returnValue = '';
        });

        return () => {
            window.removeEventListener('beforeunload', function (e) {
                e.preventDefault();
                e.returnValue = '';
            });
        }
    }, []);


    return (
        <>
            {!isLoginPage && <Nav/>}
            <NextUIProvider>
                {children}
                {!isLoginPage && !isCreatePage && !isAccountPage && <Footer/>}
            </NextUIProvider>
        </>
    )
}
export default IsNavFooter
