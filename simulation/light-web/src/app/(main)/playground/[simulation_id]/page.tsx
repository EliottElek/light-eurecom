"use client"
import React from 'react'
import useSWR from 'swr'
import { fetcher } from '@/lib/fetcher'
import Canva from '@/components/canvas/Canva'
import Link from 'next/link'

const SimulationPage = ({
    params,
}: {
    params: { simulation_id: string }
}) => {
    const { data, error, isLoading } = useSWR(`http://localhost:5000/simulations/${params.simulation_id}`, fetcher, { refreshInterval: 1000 })

    if (isLoading) return <div className="relative flex h-full items-center py-36 lg:px-8"><svg className="animate-spin h-5 w-5 mr-3 ..." viewBox="0 0 24 24">
    </svg></div>
    if (error || data.error)
        return (
            <div className="relative flex h-screen items-center py-36 lg:px-8">
                <div className="relative mx-auto flex w-full text-center max-w-2xl flex-col items-center px-4 sm:px-6 lg:px-0">
                    <p className="font-mono text-sm leading-7 text-slate-500">404</p>
                    <h1 className="mt-4 text-lg font-bold text-slate-900">
                        Page not found
                    </h1>
                    <p className="mt-2 text-base leading-7 text-slate-700">
                        Sorry, we couldn’t find the simulation with id: <span className='font-bold'>{params.simulation_id}</span>
                    </p>
                    <Link
                        href="/playground"
                        className="mt-4 text-sm font-bold leading-6 text-primary hover:text-teal-700 active:text-teal-900"
                    >
                        Go back home
                    </Link>
                </div>
            </div>)

    return (
        <Canva data={{ ...data }} />
    )
}

export default SimulationPage
