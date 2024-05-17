export default function Example() {
    return (
        <div className="py-24 sm:py-12 border-b border-gray-200 dark:border-gray-400/20">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <p className="text-xs opacity-30 italic pb-3">Possible with</p>

                <div className="-mx-6 grid grid-cols-1 gap-0.5 overflow-hidden sm:mx-0 sm:rounded-2xl md:grid-cols-3">
                    <div className="dark:invert flex items-center p-2">
                        <img
                            className="md:max-h-20 max-h-32 dark:filter-invert w-full object-contain"
                            src="./eurecom.png"
                            alt="Laravel"
                            width={258}
                            height={88}
                        />
                    </div>
                    <div className="dark:invert flex items-center p-2">
                        <img
                            className="max-h-32 grayscale w-full object-contain"
                            src="./erc.png"
                            alt="SavvyCal"
                            width={258}
                            height={88}
                        />
                    </div>
                    <div className="dark:invert flex items-center p-2">
                        <img
                            className="md:max-h-16 max-h-32 grayscale w-full object-contain"
                            src="./openair.png"
                            alt="Statamic"
                            width={158}
                            height={48}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}
