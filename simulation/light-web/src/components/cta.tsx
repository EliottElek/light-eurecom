"use client"
import { useServerStatus } from '@/context/ServerStatusContext'
import Link from 'next/link'
import React from 'react'
import { Button } from './ui/button'

const Cta = () => {
    const { serverUp } = useServerStatus()
    return (
        <div>{serverUp ?
            <Link href="/playground">
                <Button className="hidden lg:block">
                    Playground
                </Button>
            </Link>
            :
            <Link href="/demo">
                <Button className="hidden lg:block">
                    View demos
                </Button>
            </Link>
        }</div>
    )
}

export default Cta