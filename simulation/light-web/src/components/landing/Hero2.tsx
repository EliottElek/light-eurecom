import { ChevronRightIcon } from '@heroicons/react/20/solid'

export default function Hero() {
    return (
        <div className="relative overflow-hidden">
            <main>
                <div className="bg-gray-900 pt-10 sm:pt-16 lg:overflow-hidden lg:pb-14 lg:pt-8">
                    <div className="mx-auto max-w-7xl lg:px-8">
                        <div className="lg:grid lg:grid-cols-2 lg:gap-8">
                            <div className="mx-auto max-w-md px-6 sm:max-w-2xl sm:text-center lg:flex lg:items-center lg:px-0 lg:text-left">
                                <div className="lg:py-24">
                                    <div className="hidden sm:mb-5 sm:flex sm:justify-center lg:justify-start">
                                        <a
                                            href="#"
                                            className="flex items-center rounded-full bg-black p-1 pr-2 text-white hover:text-gray-200 sm:text-base lg:text-sm xl:text-base"
                                        >
                                            <span className="rounded-full bg-primary px-3 py-0.5 text-sm font-semibold leading-5 text-white">
                                                We're hiring
                                            </span>
                                            <span className="ml-4 text-sm">Visit our careers page</span>
                                            <ChevronRightIcon className="ml-2 h-5 w-5 text-gray-500" aria-hidden="true" />
                                        </a>
                                    </div>
                                    <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:mt-6 xl:text-5xl">
                                        <span className='text-primary'>Redefining</span> Video on Demand (VoD) in Wireless and Wired Networks</h1>
                                    <p className="mt-3 text-base text-gray-300 sm:mt-5 sm:text-xl lg:text-lg xl:text-xl">
                                        Cache-aided multicasting for Reducing VoD Loads in Networks.
                                    </p>
                                    <div className="mt-10 sm:mt-12">
                                        <form action="#" className="sm:mx-auto sm:max-w-xl lg:mx-0">
                                            <div className="sm:flex">
                                                <div className="min-w-0 flex-1">
                                                    <label htmlFor="email" className="sr-only">
                                                        Email address
                                                    </label>
                                                    <input
                                                        id="email"
                                                        type="email"
                                                        placeholder="Enter your email"
                                                        className="block w-full rounded-md border-0 px-4 py-3 text-base text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:ring-offset-2 focus:ring-offset-gray-900"
                                                    />
                                                </div>
                                                <div className="mt-3 sm:ml-3 sm:mt-0">
                                                    <button
                                                        type="submit"
                                                        className="block w-full rounded-md bg-primary px-4 py-3 font-medium text-white shadow hover:bg-primary focus:outline-none focus:ring-2 focus:ring-primary/30 focus:ring-offset-2 focus:ring-offset-gray-900"
                                                    >
                                                        Start free trial
                                                    </button>
                                                </div>
                                            </div>
                                            <p className="mt-3 text-sm text-gray-300 sm:mt-4">
                                                Start your free 14-day trial, no credit card necessary. By providing your email, you agree to
                                                our{' '}
                                                <a href="#" className="font-medium text-white">
                                                    terms of service
                                                </a>
                                                .
                                            </p>
                                        </form>
                                    </div>
                                </div>
                            </div>
                            <div className="-mb-16 mt-12 sm:-mb-48 lg:relative lg:m-0">
                                <div className="mx-auto max-w-md px-6 sm:max-w-2xl lg:max-w-none lg:px-0">
                                    {/* Illustration taken from Lucid Illustrations: https://lucid.pixsellz.io/ */}
                                    <img
                                        className="w-full lg:absolute lg:inset-y-0 lg:left-0 lg:h-full lg:w-auto lg:max-w-none"
                                        src="https://tailwindui.com/img/component-images/cloud-illustration-primary.svg"
                                        alt=""
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* More main page content here... */}
            </main>
        </div>
    )
}
