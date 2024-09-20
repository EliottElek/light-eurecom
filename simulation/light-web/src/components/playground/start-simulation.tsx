
"use client"
import { usePlayground } from '@/context/PlaygroundContext'
import React, { useState } from 'react'
import { Button } from '../ui/button'
import { ReloadIcon } from '@radix-ui/react-icons'

const StartSimulation = () => {
    const { loading, startSimulation, serverUp } = usePlayground()


    if (!serverUp) return (
        <div>
            <Button disabled>
                Server is down
            </Button>
        </div>)

    if (loading) return (<div>
        <Button disabled>
            <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
            Please wait
        </Button>
    </div>)
    return (
        <div>
            <Button
                disabled={loading}
                onClick={startSimulation}
                className="bg-primary text-white py-2 px-4 rounded"
            >
                Start Simulation {loading && <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                }
            </Button>

        </div>
    )
}

export default StartSimulation