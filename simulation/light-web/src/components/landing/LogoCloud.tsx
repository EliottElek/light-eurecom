export default function Example() {
    return (
        <div className="bg-gray-400/5 py-24 sm:py-12">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <p className="text-xs opacity-30 italic pb-3">Possible with</p>

                <div className="-mx-6 grid grid-cols-2 gap-0.5 overflow-hidden sm:mx-0 sm:rounded-2xl md:grid-cols-3">
                    <div className="bg-white flex items-center p-2">
                        <img
                            className="max-h-20 grayscale w-full object-contain"
                            src="https://www.eurecom.fr/sites/www.eurecom.fr/files/images/1-IMG_Eurecom/IMG_Media/EURECOM_logo_niveauDeGris.jpg"
                            alt="Laravel"
                            width={258}
                            height={88}
                        />
                    </div>
                    <div className="bg-white flex items-center p-2">
                        <img
                            className="max-h-32 grayscale w-full object-contain"
                            src="https://upload.wikimedia.org/wikipedia/fr/2/21/ERC_Logo.PNG"
                            alt="SavvyCal"
                            width={258}
                            height={88}
                        />
                    </div>
                    <div className="bg-white flex items-center p-2">
                        <img
                            className="max-h-16 grayscale w-full object-contain"
                            src="https://openairinterface.org/wp-content/uploads/2015/06/cropped-oai_final_logo.png"
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
