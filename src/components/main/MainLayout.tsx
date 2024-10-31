import sessions from '@/helpers/sessions';
import { useRouter } from 'next/router';
import React, { memo, useEffect } from 'react'
import Navbar from './Navbar';
import Sidebar from './Drawer';

interface IMainLayout {
    children?: React.ReactNode,
    className?: string,
    title?: string
}

const Layout: React.FC<IMainLayout> = ({
    children,
    className,
    title,
}) => {
    const router = useRouter()

    useEffect(() => {
        if (!sessions.getToken()) {
            router.push('/auth')
        }
    }, [sessions.getToken()])

    return (
        <main className={`w-full h-screen bg-gray-100 relative ${className}`}>
            <Navbar title={title}/>
            {children}
        </main>
    )
};

export default memo(Layout);
