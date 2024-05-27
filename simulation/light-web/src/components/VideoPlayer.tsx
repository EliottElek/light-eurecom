import React from 'react'
import ReactPlayer from 'react-player'


const VideoPlayer = ({ url, status }: { url: string, status: string }) => {
    if (status === "loading") return (
        <div className='w-[200px] h-[130px] bg-white dark:bg-gray-900 flex items-center justify-center'>
            Loading...
        </div>
    )
    return (
        <ReactPlayer playing={true} width={200} height={130} url={url} />
    )
}

export default VideoPlayer