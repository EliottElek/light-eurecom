import { getVideos } from '@/data'
import '@/styles/tailwind.css'
import type { Metadata } from 'next'
import type React from 'react'
import { ApplicationLayout } from './application-layout'

export const metadata: Metadata = {
  title: {
    template: '%s - LightStream',
    default: 'LightStream',
  },
  description: '',
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  let videos = await getVideos(null)

  return (
    <html
      lang="en"
      className="text-zinc-950 antialiased lg:bg-zinc-100 dark:bg-zinc-900 dark:text-white dark:lg:bg-zinc-950 dark"
    >
      <head>
        <link rel="preconnect" href="https://rsms.me/" />
        <link rel="stylesheet" href="https://rsms.me/inter/inter.css" />
      </head>
      <body>
        <ApplicationLayout videos={videos}>{children}</ApplicationLayout>
      </body>
    </html>
  )
}
