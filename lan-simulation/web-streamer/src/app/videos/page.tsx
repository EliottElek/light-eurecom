import { Badge } from '@/components/badge'
import { Button } from '@/components/button'
import { Divider } from '@/components/divider'
import { Dropdown, DropdownButton, DropdownItem, DropdownMenu } from '@/components/dropdown'
import { Heading } from '@/components/heading'
import { Input, InputGroup } from '@/components/input'
import { Link } from '@/components/link'
import { Select } from '@/components/select'
import { getVideos } from '@/data'
import { EllipsisVerticalIcon, MagnifyingGlassIcon } from '@heroicons/react/16/solid'
import type { Metadata } from 'next'
import { StaticImport } from 'next/dist/shared/lib/get-img-props'
import Image from 'next/image'
import { Key, ReactElement, JSXElementConstructor, ReactNode, ReactPortal, AwaitedReactNode } from 'react'

export const metadata: Metadata = {
    title: 'videos',
}

export default async function Videos() {
    let videos = await getVideos(null)

    return (
        <>
            <div className="flex flex-wrap items-end justify-between gap-4">
                <div className="max-sm:w-full sm:flex-1">
                    <Heading>Videos</Heading>
                    {/* <div className="mt-4 flex max-w-xl gap-4">
                        <div className="flex-1">
                            <InputGroup>
                                <MagnifyingGlassIcon />
                                <Input name="search" placeholder="Search videos&hellip;" />
                            </InputGroup>
                        </div>
                        <div>
                            <Select name="sort_by">
                                <option value="name">Sort by name</option>
                                <option value="date">Sort by date</option>
                                <option value="status">Sort by status</option>
                            </Select>
                        </div>
                    </div> */}
                </div>
                {/* <Button>Create video</Button> */}
            </div>
            <ul className="mt-10 grid w-full lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6">
                {videos.map((video: any) => (
                    <>
                        <li key={video.id}>
                            <div className="flex items-center flex-col justify-between">
                                <div key={video.id}>
                                    <div className="w-full shrink-0">
                                        <Link href={`/videos/${video?.id}`} aria-hidden="true">
                                            <Image width="800" height="800" className="aspect-[3/2] object-cover rounded-lg shadow" src={`http://localhost:5000/${video.thumbnail}`} alt="" />
                                        </Link>
                                    </div>
                                    <div className="space-y-1.5 mt-3">
                                        <div className="text-base/6 font-semibold">
                                            <Link href={`/videos/${video?.id}`}>{video.title}</Link>
                                        </div>
                                        <div className="text-xs/6 text-zinc-500 line-clamp-2">
                                            {video.description}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </li>
                    </>
                ))}
            </ul>
        </>
    )
}
