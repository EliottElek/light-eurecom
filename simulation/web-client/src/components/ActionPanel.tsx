"use client"
import { Demo } from '@/lib/demos'
import { Simulation } from '@/lib/simulation'
import React from 'react'
import toast from 'react-hot-toast'
import axios from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Logo } from './landing/Logo'
const ActionPanel = ({ demos, simulations }: { demos: Demo[], simulations: Simulation[] }) => {
    const router = useRouter()

    const action = async (endpoint: string) => {
        const { data } = await axios.post(endpoint)
        router.push(`/playground/${data.simulation_id}`)
    }
    const startAction = async (endpoint: string) => {
        toast.promise(
            action(endpoint),
            {
                loading: 'Starting simulation...',
                success: <b>Simulation started.</b>,
                error: <b>Could not start simulation.</b>,
            }
        );
    }
    return (
        <div className="w-full h-screen border-r overflow-y-auto">
            <div className='mb-4 border-b p-4'>
                <Link href="/" aria-label="Home" className='relative'>
                    <Logo className="h-8 w-auto" />
                    <span className='absolute -bottom-1 font-semibold text-teal-500 right-16 italic text-xs'>Playground</span>
                </Link>
            </div>
            <div className='overflow-auto grow'>
                <p className='ml-2 text-xs font-semibold'>Demos</p>
                <ul>
                    {demos?.length === 0 && <li className="text-center text-sm italic mt-4">
                        No demo to show.
                    </li>}
                    {demos?.map((demo: Demo) => <li key={demo.id} className="hover:bg-gray-300/20"><button onClick={() => startAction(demo.action)} className="flex p-2 h-full w-full" >{demo.name}</button></li>)}</ul>
                <p className='ml-2 text-xs font-semibold mt-4'>Past simulations</p>
                <ul className='w-full'>
                    {simulations?.length === 0 && <li className="text-center text-sm italic mt-4">
                        No simulation yet.
                    </li>}
                    {simulations?.map((sim: Simulation) => (
                        <li className="hover:bg-gray-300/20 w-full" key={sim.id}>
                            <Link className="truncate flex p-2 h-full" href={`/playground/${sim.id}`}>
                                <span className='truncate text-ellipsis'>{sim.name}-{sim.id}</span>
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default ActionPanel