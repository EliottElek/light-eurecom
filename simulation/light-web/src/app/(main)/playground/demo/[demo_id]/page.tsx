import React from 'react'
import Canva from '@/components/canvas/local/Canva'
import { getLocalDemo } from '@/lib/demos'
import { redirect } from 'next/navigation'

const DemoPage = async ({
    params,
}: {
    params: { demo_id: string }
}) => {
    const localDemo = await getLocalDemo(params.demo_id)
    if (!localDemo) redirect('/404')
    return (
        <Canva data={{ ...localDemo }} />
    )
}

export default DemoPage
