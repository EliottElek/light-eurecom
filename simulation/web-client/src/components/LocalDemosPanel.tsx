"use client"
import { LocalDemo } from '@/lib/demos'
import React from 'react'
import Link from 'next/link'
const LocalDemosPanel = ({ demos }: { demos: LocalDemo[] }) => {

    return (
        <div className='overflow-auto grow'>
            <p className='ml-2 text-xs font-semibold'>Demos</p>
            <ul>
                {demos && demos?.map((demo: LocalDemo) => <li key={demo.id} className="hover:bg-gray-300/20"><Link href={demo.slug} className="flex p-2 h-full w-full" >{demo.name}</Link></li>)}</ul>
        </div>
    )
}

export default LocalDemosPanel