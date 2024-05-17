import { Inter } from 'next/font/google'
import clsx from 'clsx'
import { Providers } from './providers'
import '@/styles/tailwind.css'
import { type Metadata } from 'next'
import { Toaster } from 'react-hot-toast'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: {
    template: '%s - Light',
    default: 'Light - Custom content delivery over multicast',
  },
  description:
    'Custom content delivery over multicast',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (

    <html lang="en" suppressHydrationWarning>
      <body className={clsx('bg-gray-50 dark:bg-slate-900')}>
        <Providers>
          {children}
          <Toaster />
        </Providers>
      </body>
    </html>
  )
}
