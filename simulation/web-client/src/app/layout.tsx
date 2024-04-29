import { type Metadata } from 'next'

import '@/styles/tailwind.css'
import { Toaster } from 'react-hot-toast'

export const metadata: Metadata = {
  title: {
    template: '%s - Their Side',
    default:
      'Their Side - Conversations with the most tragically misunderstood people of our time',
  },
  description:
    'Conversations with the most tragically misunderstood people of our time.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="bg-white antialiased overflow-hidden">
      <head>
        <link
          rel="preconnect"
          href="https://cdn.fontshare.com"
          crossOrigin="anonymous"
        />
        <link
          rel="stylesheet"
          href="https://api.fontshare.com/v2/css?f[]=satoshi@700,500,400&display=swap"
        />
      </head>
      <body>
        <div>{children}</div>
        <div><Toaster position='top-right' /></div>
      </body>
    </html>
  )
}
