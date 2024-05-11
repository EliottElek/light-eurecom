import ErrorDialog from '@/components/ErrorDialog'
import { getAllDemos } from '@/lib/demos'
import React from 'react'
import HomeActionPanel from '@/components/HomeActionPanel'

const page = async () => {
  const demos = await getAllDemos()
  if (!demos) return <main className="flex h-full grow oveflow-hidden">
    <ErrorDialog error={"Could not reach the server."} details={'An error occured trying to reach the server. Come back later or contact support.'} />
  </main>
  return (
    <HomeActionPanel demos={demos} />
  )
}

export default page