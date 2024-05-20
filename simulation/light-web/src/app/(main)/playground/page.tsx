import { getLocalDemos } from '@/lib/demos'
import React from 'react'
import LocalHomeActionPanel from '@/components/LocalHomeActionPanel'
import { HeroPattern } from '@/components/landing/HeroPattern'
const page = async () => {
  const demos = await getLocalDemos()
  return (
    <div className='lg:p-12 p-4'>
      <HeroPattern />

      <div className='prose'>
        <h1 className='my-0 dark:text-white'>Playground</h1>
        <p className='mb-4 text-gray-600 dark:text-gray-300'>Play simulations to understand how the principle works.</p>
      </div>
      {/* <HomeActionPanel demos={demos} /> */}
      <LocalHomeActionPanel demos={demos} />
    </div>
  )
}

export default page