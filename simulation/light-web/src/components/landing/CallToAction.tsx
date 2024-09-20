import Link from "next/link";
import { Button } from "./Button";

export function CallToAction() {
  return (
    <div id="demos" className="border-t overflow-hidden border-b ">
      <div className="px-6 py-20 sm:px-6 sm:py-28 lg:px-8">
        <div className="relative  mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Check the LIGHT VoD demo
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-8 opacity-75">
            See for yourself. With minimal modifications to systems, experience unparalleled efficiency and scalability.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Button
              variant="solid"
              target='_blank'
              href="https://docs.google.com/presentation/d/e/2PACX-1vTLiYcxMe6Msu2iA1UlYUzGeksZwxMBLKNKzm7hGZr2redgyY_njZdvHtJXgAyEPWP8cTOSzhbzGbCU/pub?start=false&loop=false&delayms=60000#slide=id.p"
            >
              View slides
            </Button>
            <Link href="/playground" className="text-sm font-semibold leading-6">
              View demos <span aria-hidden="true">→</span>
            </Link>
          </div>
          <svg
            viewBox="0 0 1024 1024"
            className="absolute left-1/2 top-1/2 -z-10 h-[64rem] w-[64rem] -translate-x-1/2 [mask-image:radial-gradient(closest-side,white,transparent)]"
            aria-hidden="true"
          >
            <circle cx={512} cy={512} r={512} fill="url(#827591b1-ce8c-4110-b064-7cb85a0b1217)" fillOpacity="0.7" />
            <defs>
              <radialGradient id="827591b1-ce8c-4110-b064-7cb85a0b1217">
                <stop stopColor="hsl(var(--primary))" />
                <stop offset={1} stopColor="hsl(var(--primary))" />
              </radialGradient>
            </defs>
          </svg>
        </div>
      </div>
    </div>
  )
}
