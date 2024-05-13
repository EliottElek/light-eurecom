"use client"
import { Demo } from '@/lib/demos'
import { useRouter } from 'next/navigation'
import React from 'react'
import axios from 'axios'
import toast from 'react-hot-toast'
import Image from 'next/image'

const HomeActionPanel = ({ demos }: { demos: Demo[] | null }) => {
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
        <ul role="list" className="grid grow lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6">
            {demos && demos?.map((demo: Demo) => (
                <li key={demo.id} className="hover:bg-gray-400/10 p-2 rounded-lg duration-100">
                    <button onClick={() => startAction(demo.action)} className="w-full h-full text-left">
                        <div className='h-40 border rounded-md overflow-hidden'>
                            <Image alt={demo.name} height={400} width={400} className='object-cover h-full w-full' src={demo.image} />
                        </div>
                        <p className='prose mt-2 font-semibold text-sm'>{demo.name}</p>
                        <p className='prose mt-2 text-sm truncate text-gray-600'>{demo.description}</p>
                    </button>
                </li>
            ))}
        </ul>
    )
}

export default HomeActionPanel