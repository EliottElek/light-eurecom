import React from 'react'
import { Logomark } from '@/components/landing/Logo'
const loading = () => {
    return (
        <div className="fixed bg-background z-50 inset-0 flex items-center animate-pulse justify-center"><div className="flex gap-2 items-center"><Logomark /><span>Loading...</span></div></div>
    )
}

export default loading