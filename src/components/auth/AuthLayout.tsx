import sessions from '@/helpers/sessions';
import useStoreGlobal from '@/stores/global';
import { useRouter } from 'next/router';
import React, { memo, useEffect } from 'react'

interface IAuthLayout {
  children?: React.ReactNode,
  className?: string
}

const Layout: React.FC<IAuthLayout> = ({
  children,
  className,
}) => {
  const router = useRouter()

  useEffect(() => {
    if (sessions.getToken()) {
        router.replace('/')
    }
  }, [sessions.getToken()])

  return (
    <main className={`w-full h-screen relative ${className}`}>
        {children}
    </main>
  )
};

export default memo(Layout);
