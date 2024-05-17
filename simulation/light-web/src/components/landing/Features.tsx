import { PaperAirplaneIcon, LightBulbIcon, GlobeAltIcon } from '@heroicons/react/24/outline'

const features = [
    {
        name: 'Cellular & WiFi Networks',
        points: [
            'Light VoD boosts MU-MIMO',
            'Serve up to 4 times more users with Light',
            'Having more VoD users is not a problem anymore',
            'Increases your rates up to 500%',
            'Exploit storage in user devices',
            'No need to update your hardware'
        ],
        href: '#',
        icon: <PaperAirplaneIcon className='text-white h-7 w-7 -rotate-45' />,
    },
    {
        name: 'Content Delivery Networks (CDNs)',
        points: [
            'You have the network, you have the caches, you have the protocols...',
            'Just make your caches "smarter" to achieve up to 400% caching gains!'],
        href: '#',
        icon: <LightBulbIcon className='text-white h-7 w-7 -rotate-45' />,
    },
    {
        name: 'Satellite Networks',
        points: [
            'Get one step closer to making Satellite VoD truly viable and competitive with fiber',
            'Deliver content faster to VoD consumers or to terrestrial stations'
        ],
        href: '#',
        icon: <GlobeAltIcon className='text-white h-7 w-7 -rotate-45' />,
    },
]

export default function Features() {
    return (
        <div className="pb-12">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                {/* <div className="mx-auto max-w-2xl lg:mx-0">
                    <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                        Stay on top of customer support
                    </h2>
                    <p className="mt-6 text-lg leading-8 text-gray-600">
                        Lorem ipsum dolor sit amet consect adipisicing elit. Possimus magnam voluptatum cupiditate veritatis in
                        accusamus quisquam.
                    </p>
                </div> */}
                <div className="mx-auto mt-3 max-w-2xl lg:max-w-none">
                    <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
                        {features.map((feature) => (
                            <div key={feature.name} className="flex border border-gray-200 dark:border-gray-400/20 rounded-lg flex-col p-8">
                                <dt className="text-base font-semibold leading-7 text-gray-900 dark:text-white dark:text">
                                    <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-lg bg-primary">
                                        {feature.icon}
                                    </div>
                                    {feature.name}
                                </dt>
                                <dd className="mt-1 flex flex-auto flex-col text-base leading-7 text-gray-600 dark:text-gray-400">
                                    <ul className="flex-auto">
                                        {feature.points.map((point: string) => <li>
                                            {point}
                                        </li>)}</ul>
                                    {/* <p className="mt-6">
                                        <a href={feature.href} className="text-sm font-semibold leading-6 text-primary">
                                            Learn more <span aria-hidden="true">→</span>
                                        </a>
                                    </p> */}
                                </dd>
                            </div>
                        ))}
                    </dl>
                </div>
            </div>
        </div>
    )
}
