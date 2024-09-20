import { LocalDemo } from '@/lib/demos'
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
const LocalHomeActionPanel = ({ demos }: { demos: LocalDemo[] | null }) => {

    return (
        <ul role="list" className="grid grow lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6">
            {demos && demos?.map((demo: LocalDemo) => (
                <li key={demo.id} className="hover:bg-gray-400/10 p-2 rounded-lg duration-100">
                    {demo.active ?
                        <Link href={demo.slug} className="w-full h-full text-left">
                            <div className='h-40 border  rounded-md overflow-hidden'>
                                <Image alt={demo.name} height={400} width={400} className='object-cover h-full w-full' src={demo.image} />
                            </div>
                            <p className='prose mt-2 font-semibold  dark:text-gray-200 text-sm'>{demo.name}</p>
                            <p className='prose mt-2 text-sm truncate text-gray-600 dark:text-gray-400'>{demo.description}</p>
                        </Link> :
                        <span className="w-full  h-full text-left relative">
                            <div className='h-40 opacity-50 border  rounded-md overflow-hidden'>
                                <Image alt={demo.name} height={400} width={400} className='object-cover h-full w-full' src={demo.image} />
                            </div>
                            <p className='prose opacity-50 mt-2 font-semibold  dark:text-gray-200 text-sm'>{demo.name}</p>
                            <p className='prose opacity-50 mt-2 text-sm truncate text-gray-600 dark:text-gray-400'>{demo.description}</p>
                            <span><span className="absolute top-1 left-1 inline-flex items-center rounded-full bg-green-50 px-2 py-1 text-xs font-medium text-green-800 ring-1 ring-inset ring-green-600/20">
                                Comming soon
                            </span></span>
                        </span>}
                </li>
            ))}
        </ul>
    )
}

export default LocalHomeActionPanel