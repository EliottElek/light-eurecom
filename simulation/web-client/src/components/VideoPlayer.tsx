import React from 'react'
import ReactPlayer from 'react-player'


const VideoPlayer = ({ url, status }: { url: string, status: string }) => {
    // if (status === "loading") return (
    //     <div className='w-[100px] h-[65px] flex items-center justify-center'>
    //         Loading...
    //     </div>
    // )
    // else if (status !== "playing") return (
    //     <div className='w-[100px] h-[65px] flex items-center justify-center'>
    //         {status}
    //     </div>
    // )
    return (
        <ReactPlayer playing={true} width={100} height={65} url={url} />
    )
}

export default VideoPlayer