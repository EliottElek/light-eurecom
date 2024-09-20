import { usePlayground } from '@/context/PlaygroundContext'
import React from 'react'

const ServerStatus = () => {
    const { serverUp } = usePlayground()

    return (
        <div className="flex items-center">
            {serverUp === null ? (
                <span className="inline-flex items-center gap-x-1.5 rounded-full bg-gray-400/20 px-2 py-1 text-xs font-medium text-gray-500">
                    Checking status...
                </span>
            ) : serverUp ? (
                <span className="inline-flex items-center gap-x-1.5 rounded-full bg-green-400/20 px-2 py-1 text-xs font-medium text-green-600">
                    <svg viewBox="0 0 6 6" aria-hidden="true" className="h-1.5 w-1.5 fill-green-400">
                        <circle r={3} cx={3} cy={3} />
                    </svg>
                    Server up
                </span>
            ) : (
                <span className="inline-flex items-center gap-x-1.5 rounded-full bg-red-400/20 px-2 py-1 text-xs font-medium text-red-600">
                    <svg viewBox="0 0 6 6" aria-hidden="true" className="h-1.5 w-1.5 fill-red-400">
                        <circle r={3} cx={3} cy={3} />
                    </svg>
                    Server down
                </span>
            )}
        </div>
    )
}

export default ServerStatus