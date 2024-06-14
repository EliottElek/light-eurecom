import React, {
    forwardRef,
    useEffect,
    useImperativeHandle,
    useRef,
    useState,
} from "react";
import Hls from "hls.js/dist/hls.light";

interface Props extends React.HTMLProps<HTMLVideoElement> {
    manifest: string;
}

const HLSPlayer = forwardRef<HTMLVideoElement, Props>(
    ({ manifest, ...props }, ref) => {
        const videoRef = useRef<HTMLVideoElement>(null);
        const [isPlaying, setIsPlaying] = useState(false);

        useImperativeHandle(ref, () => videoRef.current!);

        useEffect(() => {
            const src = manifest;
            const { current: video } = videoRef;
            if (!video) return;

            let hls: any | null;
            if (video.canPlayType("application/vnd.apple.mpegurl")) {
                video.src = src;
            } else if (Hls.isSupported()) {
                const hls = new Hls();
                hls.loadSource(src);
                hls.attachMedia(video);
            }

            return () => hls?.destroy();
        }, [manifest]);

        const handlePlayPause = () => {
            const { current: video } = videoRef;
            if (video) {
                if (video.paused) {
                    video.play();
                    setIsPlaying(true);
                } else {
                    video.pause();
                    setIsPlaying(false);
                }
            }
        };

        return (
            <div className="relative w-full h-full">
                <video
                    className="video aspect-video w-full h-full"
                    {...props}
                    ref={videoRef}
                />
                <div className="absolute bottom-4 left-4 flex space-x-4">
                    <button
                        className="w-8 h-8 bg-gray-700 text-white rounded-full flex items-center justify-center focus:outline-none"
                        onClick={handlePlayPause}
                    >
                        {isPlaying ? (
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M10 9v6m4-6v6"
                                />
                            </svg>
                        ) : (
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M14.752 11.168l-5.197-2.998A1 1 0 008 9.07v5.86a1 1 0 001.555.832l5.197-2.999a1 1 0 000-1.664z"
                                />
                            </svg>
                        )}
                    </button>
                </div>
            </div>
        );
    }
);

HLSPlayer.displayName = "HLSPlayer";

export default HLSPlayer;
