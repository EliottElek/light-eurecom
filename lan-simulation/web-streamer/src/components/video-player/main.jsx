
"use client"
import dynamic from "next/dynamic";
import Head from "next/head";
import React, { Suspense } from "react";

const HLSPlayer = dynamic(() => import("@/components/video-player/VideoPlayer"), {
    suspense: true,
});

const VideoPage = ({ thumbnail, manifest }) => {

    return (
        <>
            <Head>
                <link rel="preconnect" href="https://stream.mux.com" /> {/* Preconnect to your HLS service of choice */}
                {/* Preload thumbnails based on device width */}
                <link
                    rel="preload"
                    href={thumbnail}
                    as="image"
                    type="image/jpeg"
                    media="(max-width: 600px)"
                />
                <link
                    rel="preload"
                    href={`http://localhost:5000/${thumbnail}`}
                    as="image"
                    type="image/jpeg"
                    media="(min-width: 601px)"
                />
            </Head>
            <div className="relative">
                <Suspense fallback={<VideoFallback />}> {/* Render video fallback with preloaded poster */}
                    <HLSPlayer
                        allowFullScreen
                        autoPlay
                        className="fixed inset-0 h-full object-contain relative z-10 video"
                        playsInline
                        controls
                        manifest={manifest}
                        poster={`http://localhost:5000/${thumbnail}`}
                    />
                </Suspense>
            </div>
        </>
    );
};

export default VideoPage;

// Auto switch video url using native CSS (server rendered also) to correct preloaded poster
const VideoFallback = () => {
    return (
        <>
            <div className="video-fallback w-full aspect-video object-contain relative z-10" />
            <style jsx>
                {`
          @media screen and (max-width: 600px) {
            .video-fallback {
              background-image: url(${thumbnail});
              background-size: cover;
              background-position: center;
            }
          }
          @media screen and (min-width: 601px) {
            .video-fallback {
              background-image: url(${thumbnail});
              background-size: cover;
              background-position: center;
            }
          }
        `}
            </style>
        </>
    );
};