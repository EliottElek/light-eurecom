import { getLocalDemos } from '@/lib/demos'
import React from 'react'
import LocalHomeActionPanel from '@/components/LocalHomeActionPanel'

const page = async () => {
  const demos = await getLocalDemos()
  return (
    <div className='lg:p-12 p-4'>
      <div className='prose'>
        <h1 className='my-0'>Playground</h1>
        <p className='mb-4 text-gray-600'>Play simulations to understand how the principle works.</p>
      </div>
      {/* <HomeActionPanel demos={demos} /> */}
      <LocalHomeActionPanel demos={demos} />
    </div>
  )
}

export default page