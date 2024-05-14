import { Button } from '@/components/landing/Button'
import { Container } from '@/components/landing/Container'

function PlayIcon(props: React.ComponentPropsWithoutRef<'svg'>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <circle cx="12" cy="12" r="11.5" stroke="#D4D4D4" />
      <path
        d="M9.5 14.382V9.618a.5.5 0 0 1 .724-.447l4.764 2.382a.5.5 0 0 1 0 .894l-4.764 2.382a.5.5 0 0 1-.724-.447Z"
        fill="#A3A3A3"
        stroke="#A3A3A3"
      />
    </svg>
  )
}

export function Hero() {
  return (
    <div className="overflow-hidden border-b border-gray-200 dark:border-gray-400/20 h-screen min-h-[600px] flex items-center">
      <Container>
        <div className="text-center max-w-4xl mx-auto">
          <div className="relative z-10 mx-auto lg:col-span-7 xl:col-span-6">
            <h1 className="xl:text-6xl lg:text-5xl md:text-4xl text-3xl font-bold tracking-tight dark:text-white text-gray-900">
              <span className='text-primary'>Redefining</span> Video on Demand (VoD) in Wireless and Wired Networks</h1>
            <p className="mt-6 text-lg text-gray-600 dark:text-gray-400">
              Cache-aided multicasting for Reducing VoD Loads in Networks.
            </p>
            <div className="mt-16 flex justify-center flex-wrap gap-x-6 gap-y-4">
              <Button
                href='/playground'
              >
                View demos
              </Button>
              <Button
                href="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
                variant="outline"
              >
                <PlayIcon className="h-6 w-6 flex-none" />
                <span className="ml-2.5">Watch the video</span>
              </Button>
            </div>
          </div>
          {/* <div className="relative mt-10 sm:mt-10 lg:col-span-5 lg:row-span-2 lg:mt-0 xl:col-span-6">
            <BackgroundIllustration className="absolute left-1/2 top-4 h-[826px] w-[1026px] -translate-x-1/3 stroke-gray-300/70 [mask-image:linear-gradient(to_bottom,white_20%,transparent_75%)] sm:top-16 sm:-translate-x-1/2 lg:-top-16 lg:ml-12 xl:-top-14 xl:ml-0" />
          </div> */}
        </div >
      </Container >
    </div >
  )
}
