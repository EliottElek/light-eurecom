"use client"
import Canva from '@/components/canvas/index'
import { Code } from '@/components/playground/code-viewer'
import { TabsContent } from '@/components/ui/tabs'
import React from 'react'
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import useSWR from 'swr';
import { fetcher } from '@/lib/fetcher';
import { Logomark } from '@/components/landing/Logo';

const page = ({ params }: { params: { simulation_id: string } }) => {
    const { data: simulation, isLoading, error, mutate } = useSWR(`/api/simulations/${params.simulation_id}`, fetcher, { refreshInterval: 1500 })

    if (error || simulation?.error == "404") return (
        <div className="relative flex h-full items-center py-22 lg:px-8">
            <div className="relative mx-auto flex w-full text-center max-w-2xl flex-col items-center px-4 sm:px-6 lg:px-0">
                <p className="font-mono text-2xl leading-7">404</p>
                <h1 className="mt-4 text-lg font-bold">
                    Simulation not found
                </h1>
                <p className="mt-2 text-base leading-7">
                    Sorry, it seems an error occured.
                </p>
                <div className='mt-4'>
                    <Button onClick={() => mutate()}>Reload</Button>
                </div>
                <Link
                    href="/playground"
                    className="mt-4 text-sm font-bold leading-6 text-primary hover:underline"
                >
                    Go back home
                </Link>
            </div>
        </div>)
    if (simulation?.status === "error") return (
        <>
            <Logs status={"error"} title={"schema"} logs={simulation.logs} />
            <Logs status={"error"} title={"logs"} logs={simulation.logs} />
        </>
    )

    if (isLoading) return <div className="fixed inset-0 flex items-center animate-pulse justify-center"><div className="flex gap-2 items-center"><Logomark /><span>Loading...</span></div></div>

    if (simulation.status === "pending") return (
        <>
            <TabsContent value="schema" className="mt-0 border-0 p-0 h-full">
                <div className="h-full relative w-full bg-background/50 flex gap-3 p-6">
                    <span className='absolute top-1/2 left-1/2 -translate-x-1/2 animate-pulse font-bold'>Simulation is not ready yet.</span>
                    <div className='w-full'>
                        <Code title={"Logs"}>
                            {simulation?.logs.map((log: string) => <span className='w-full break-words'>{log}</span>)}
                        </Code>
                    </div>
                </div>
            </TabsContent>
            <Logs status={simulation.status} logs={simulation.logs} />
        </>
    )
    return (
        <>
            <TabsContent value="schema" className="mt-0 border-0 p-0 h-full">
                <Canva simulation={simulation} />
            </TabsContent>
            <Logs status={simulation.status} logs={simulation.logs} />
        </>
    )
}

export default page


const Logs = ({ logs, title = "logs", status = "pending" }: { logs: string[], title?: string, status?: 'pending' | 'error' | 'complete' }) => {
    return (
        <TabsContent value={title} className="mt-0 p-6 border-0 h-full overflow-y-auto">
            <Code status={status} title={"Logs"}>
                {logs.map((log: string, i: number) => <span key={i} className='w-full break-words'>{log}</span>)}
            </Code>
        </TabsContent>)
}