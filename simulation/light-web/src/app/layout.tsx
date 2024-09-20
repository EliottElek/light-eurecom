import { Providers } from './providers'
import '@/styles/tailwind.css'
import { type Metadata } from 'next'
import { ThemeProvider } from "@/components/theme-provider"
import Loader from '@/components/Loader'
import { Toaster } from "@/components/ui/toaster"


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
      <body>
        <Providers>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
          <Toaster />
        </Providers>
        <Loader />
      </body>
    </html>
  )
}
