import VideoPlayer from '@/components/video-player/main'
import { getVideo, getVideos } from '@/data';
import Link from 'next/link';
import Image from 'next/image';

const VideoPage = async ({
  params,
}: {
  params: { id: string }
}) => {

  const manifest = `http://localhost:5000/video/${params.id}/stream.m3u8`
  let videos = await getVideos(params.id)
  let metadata = await getVideo(params.id)
  return (
    <div className='prose'>
      <h1 className='text-xl font-bold'>{metadata.title}</h1>
      <p className=''>{metadata.description}</p>
      <div className='rounded-lg overflow-hidden'>
        <VideoPlayer thumbnail={`http://localhost:5000/${metadata?.thumbnail}`} manifest={manifest} />
      </div>
      <ul className="mt-10 grid w-full lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6">
        {videos.map((video: any) => (
          <>
            <li key={video.id}>
              <div className="flex items-center flex-col justify-between">
                <div key={video.id}>
                  <div className="w-full shrink-0">
                    <Link href={`/videos/${video?.id}`} aria-hidden="true">
                      <Image width="800" height="800" className="aspect-[3/2] object-cover rounded-lg shadow" src={`http://localhost:5000/${video?.thumbnail}`} alt="" />
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
    </div>
  );
};

export default VideoPage;
