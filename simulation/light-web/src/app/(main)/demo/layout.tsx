"use client"
import { PresetActions } from "@/components/playground/preset-actions"
import { ModeToggle } from "@/components/ThemeSwitcher";
import { Logomark } from '@/components/landing/Logo';
import Link from 'next/link';
import { PlaygroundProvider } from '@/context/PlaygroundContext'

export default function PlaygroundLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <PlaygroundProvider>
            {/* <HeroPattern /> */}
            <div className="flex-col h-screen w-screen overflow-hidden">
                <div className="p-4 z-50 border-b top-0 right-0 left-0 flex flex-col items-start justify-between space-y-2 py-4 sm:flex-row sm:items-center sm:space-y-0 md:h-16">
                    <Link href="/" className='flex'>
                        <div className="flex items-center flex-nowrap gap-3">
                            <Logomark />
                            <span className="font-bold text-2xl">Playground</span>
                        </div>
                    </Link>
                    <div className="flex items-center gap-2">
                        <PresetActions />
                        <ModeToggle />
                    </div>
                </div>
                <div className="flex-1 h-[calc(100vh_-_64px)] overflow-hidden">
                    {children}
                </div>
            </div >
        </PlaygroundProvider >
    )
}
