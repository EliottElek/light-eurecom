// app/providers.tsx
'use client'

import { ServerStatusProvider } from '@/context/ServerStatusContext'
import { ThemeProvider } from 'next-themes'

export function Providers({ children }: { children: React.ReactNode }) {
    return <ThemeProvider attribute="class" defaultTheme='system' enableSystem>
        <ServerStatusProvider>
            {children}
        </ServerStatusProvider>
    </ThemeProvider>
}