"use client"
import React, { memo } from 'react';
import { Handle, Position } from 'reactflow';
import ServerIcon from '../ServerIcon';
import ClientIcon from '../ClientIcon';
import RouterIcon from '../RouterIcon';
import CacheIcon from '../CacheIcon';
import ProgessBar from './ProgessBar';
import DbIcon from '@/components/DbIcon';
import InternetIcon from '@/components/InternetIcon';
import VideoPlayer from '@/components/VideoPlayer';
import clsx from 'clsx';
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
        case "internet":
            icon = <InternetIcon />
            break;
        default:
            icon = <ClientIcon />
    }
    return icon
}

function CustomNode({ data }: { data: any }) {
    return (
        <div className={clsx('relative', data.id)}>
            <div className="px-4 py-2">
                <div className="flex items-center relative">
                    <div className="text-lg absolute top-0 -translate-y-full font-bold">{data.name}</div>
                    <div className="rounded-full w-16 h-16 flex justify-center items-center">
                        <CustomIcon type={data.icon} />
                    </div>
                </div>
                <Handle type="target" position={Position.Left} className="h-8 !bg-primary" />
                <Handle type="source" position={Position.Right} className="h-8 !bg-primary" />
                {data.active && <div className='absolute inset-0 flex items-center justify-center'>
                    <span className="animate-ping z-0 absolute inline-flex h-2/3 w-2/3 rounded-lg bg-primary/50"></span>
                </div>
                }
            </div>
            <div className='absolute -bottom-2 translate-y-full'>
                {Array.isArray(data.message) ? <ul>{data.message.map((m: string) => <li>{m}</li>)}</ul> : data.message}
            </div>
            {data.cache &&
                <div className='absolute top-4 right-4 -translate-y-full min-w-[140px] translate-x-full p-1 px-3 shadow rounded-md border bg-background'>
                    <div className='absolute -right-5 -top-5 p-1 rounded-full'>
                        <CacheIcon size="25px" />
                    </div>
                    <ul>{data.cache.map((cache: string, i: number) => <li key={i}>"{cache}"</li>)}</ul>
                </div>}
            {
                data.storage &&
                <div className='absolute z-0 top-1 -left-1 -translate-y-full -translate-x-full p-1 px-3 shadow rounded-md border bg-background'>
                    <div className='absolute -right-5 -bottom-5 p-1 rounded-full'>
                        <DbIcon size="25px" />
                    </div>
                    <ul className='divide-y'>{data.storage.map((storage: string, i: number) => <li className="truncate text-xs" key={i}>"{storage}"</li>)}</ul>
                </div>
            }
            {data.video &&
                <div className='absolute top-4 right-4 -translate-y-full translate-x-full overflow-hidden shadow rounded-md borders'>
                    <VideoPlayer status={data.video.status} url={data.video.url} />
                </div>}
            {data.volume > 0 && <div className='absolute top-0 -translate-y-full left-0'>
                <ProgessBar progress={data.volume || 0} />
            </div>}
        </div>
    );
}

export default memo(CustomNode);
