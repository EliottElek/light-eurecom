"use client"
import { Demo } from '@/lib/demos'
import { Simulation } from '@/lib/simulation'
import React from 'react'
import toast from 'react-hot-toast'
import axios from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

const ActionPanel = ({ demos, simulations }: { demos: Demo[], simulations: Simulation[] }) => {
    const router = useRouter()

    const action = async (endpoint: string) => {
        const { data } = await axios.post(endpoint)
        router.push(`/simulations/${data.simulation_id}`)
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
        <div className="w-72 h-screen border-r py-6">
            <p className='ml-2 text-xs font-semibold'>Actions</p>
            <ul>{demos?.map((demo: Demo) => <li key={demo.id} className="hover:bg-gray-300/20"><button onClick={() => startAction(demo.action)} className="flex p-2 h-full w-full" >{demo.name}</button></li>)}</ul>
            <p className='ml-2 text-xs font-semibold mt-4'>Past simulations</p>
            <ul className='w-full'>
                {simulations?.map((sim: Simulation) => (
                    <li className="hover:bg-gray-300/20 w-full" key={sim.id}>
                        <Link className="truncate flex p-2 h-full" href={`/simulations/${sim.id}`}>
                            <span className='truncate text-ellipsis'>{sim.name}-{sim.id}</span>
                        </Link>
                    </li>
                ))}
            </ul>        </div>
    )
}

export default ActionPanel