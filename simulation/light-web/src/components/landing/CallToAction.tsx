import Link from "next/link";

export function CallToAction() {
  return (
    <div id="demos" className="border-t border-b border-gray-200 dark:border-gray-400/20">
      <div className="px-6 py-20 sm:px-6 sm:py-28 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
            Check the LIGHT VoD demo
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-gray-600 dark:text-gray-400">
            See for yourself. With minimal modifications to systems, experience unparalleled efficiency and scalability.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link
              href="/playground"
              className="rounded-md bg-primary px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-primary/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            >
              View demo
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
