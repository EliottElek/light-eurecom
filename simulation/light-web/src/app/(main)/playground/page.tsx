import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'

const PlaygroundDefault = () => {
  return (
    <div className='h-full w-full flex items-center justify-center'>
      <div className="flex flex-1 h-full grow flex-col gap-4 p-4 lg:gap-12 lg:p-6">
        <div
          className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm" x-chunk="dashboard-02-chunk-1"
        >
          <div className="flex flex-col items-center gap-1 text-center">
            <h3 className="text-2xl font-bold tracking-tight">
              You have no simulation.
            </h3>
            <p className="text-sm text-muted-foreground">
              Use the left panel to start a new simulation, or follow a local demonstration.
            </p>
            <div className='mt-4'>
              <Link href="/playground/local"><Button className='text-white'>View a demo</Button></Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PlaygroundDefault