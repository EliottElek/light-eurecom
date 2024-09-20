import Canva from '@/components/canvas/local/joy/Canva'
import { getLocalDemo } from '@/lib/demos'
import React from 'react'

const page = async () => {
    const demo = await getLocalDemo("1")
    return (
        <Canva data={demo}/>
    )
}

export default page