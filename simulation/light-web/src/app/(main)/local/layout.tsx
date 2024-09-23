"use client"
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "@/components/ui/hover-card"
import {
    Tabs,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"
import { Share1Icon, CodeIcon } from "@radix-ui/react-icons"
import { CodeViewer } from "@/components/playground/code-viewer"
import { RoutersSelector } from "@/components/playground/routers-selector"
import { ModelSelector } from "@/components/playground/model-selector"
import { PresetActions } from "@/components/playground/preset-actions"
import { PresetSave } from "@/components/playground/preset-save"
import { SimulationSelector } from "@/components/playground/simulation-selector"
import { PresetShare } from "@/components/playground/preset-share"
import { ClientsSelector } from "@/components/playground/clients-selector"
import { models, types } from "@/components/playground/data/models"
import { ModeToggle } from "@/components/ThemeSwitcher";
import { Logomark } from '@/components/landing/Logo';
import Link from 'next/link';
import { PlaygroundProvider, usePlayground } from '@/context/PlaygroundContext'
import StartSimulation from '@/components/playground/start-simulation'
import ServerStatus from '@/components/playground/server-status'
import { useParams } from 'next/navigation';
import useSWR from "swr"
import { fetcher } from "@/lib/fetcher"
import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
} from "@/components/ui/resizable"

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
                    <ModeToggle />
                </div>
                <div className="flex-1 h-[calc(100vh_-_64px)] overflow-hidden">
                    {children}
                </div>
            </div >
        </PlaygroundProvider >
    )
}
