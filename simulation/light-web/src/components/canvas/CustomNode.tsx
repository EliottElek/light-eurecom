"use client"
import React, { memo } from 'react';
import { Handle, Position } from 'reactflow';
import ServerIcon from '../ServerIcon';
import ClientIcon from '../ClientIcon';
import RouterIcon from '../RouterIcon';
import CacheIcon from '../CacheIcon';
import VideoPlayer from '../VideoPlayer';
import ProgessBar from './ProgessBar';
import { PhoneFrame } from '../landing/PhoneFrame';
function CustomIcon({ type }: { type: string }) {
    let icon = null;

    switch (type.toLowerCase()) {
        case "router":
            icon = <RouterIcon />
            break;
        case "server":
            icon = <ServerIcon />
            break;
        case "client":
            icon = <ClientIcon />
            break;
        default:
            icon = <ClientIcon />
    }
    return icon
}

function CustomNode({ data }: { data: any }) {
    return (
        <div className='relative'>
            <div className="px-4 py-2 min-h-400 shadow-md rounded-md bg-white border-2 border-stone-400">
                <div className="flex">
                    <div className="rounded-full w-12 h-12 flex justify-center items-center bg-gray-100">
                        <CustomIcon type={data.icon} />
                    </div>
                    <div className="ml-2">
                        <div className="text-lg font-bold">{data.name}</div>
                        {/* <div className="text-gray-500">{data.ip}</div> */}
                    </div>
                </div>
                <Handle type="target" position={Position.Left} className="h-8 !bg-primary" />
                <Handle type="source" position={Position.Right} className="h-8 !bg-primary" />
                {data.active && <div className='absolute inset-0 flex items-center justify-center'>
                    <span className="animate-ping z-0 absolute inline-flex h-2/3 w-2/3 rounded-lg bg-sky-400/50"></span>
                </div>
                }
            </div>
            <div className='absolute -bottom-2 translate-y-full'>
                {data.message}
            </div>
            {data.cache &&
                <div className='absolute top-4 right-4 -translate-y-full translate-x-full p-1 px-3 shadow rounded-md border border-gray-400 bg-white'>
                    <div className='absolute -right-5 -top-5 bg-white p-1 rounded-full border'>
                        <CacheIcon size="25px" />
                    </div>
                    <ul>{data.cache.map((cache: string, i: number) => <li key={i}>"{cache}"</li>)}</ul>
                </div>}
            {data.video &&
                <div className='absolute top-4 right-4 -translate-y-full translate-x-full overflow-hidden shadow rounded-md border border-gray-400 bg-white'>
                        <VideoPlayer status={data.video.status} url={data.video.url} />
                </div>}
            {true && <div className='absolute top-0 -translate-y-full left-0'>
                <ProgessBar progress={70} />
            </div>}
        </div>
    );
}

export default memo(CustomNode);
