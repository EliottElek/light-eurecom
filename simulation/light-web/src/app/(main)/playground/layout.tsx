import { getDemos, getLocalDemos } from "@/lib/demos"
import { getAllSimulations } from "@/lib/simulation"
import ActionPanel from "@/components/ActionPanel"
import LocalDemosPanel from "@/components/LocalDemosPanel"
import Link from "next/link"
import { Logo } from "@/components/landing/Logo"
import ThemeSwitch from "@/components/ThemeSwitcher"
export default async function SimulationLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const demos = await getDemos()
    const simulations = await getAllSimulations()
    const localDemos = await getLocalDemos()

    return (
        <main className="flex h-screen oveflow-hidden">
            <div className="!min-w-[320px] relative md:block hidden h-screen border-r border-gray-200 dark:border-gray-400/20 overflow-y-auto">
                <div className='mb-4 border-b grow border-gray-200 dark:border-gray-400/20 p-4'>
                    <Link href="/" aria-label="Home" className='relative'>
                        <Logo className="h-8 w-auto" />
                        <span className='absolute -bottom-2 font-semibold text-primary left-28 italic text-xs'>Playground</span>
                    </Link>
                </div>
                {demos && simulations ?
                    <div>
                        <ActionPanel demos={demos} simulations={simulations} />
                    </div>
                    : <div>
                        {localDemos &&
                            <LocalDemosPanel demos={localDemos} />
                        }
                    </div>}
                <div className="absolute bottom-1 left-2">
                    <ThemeSwitch />
                </div>
            </div>
            <div className="w-full overflow-auto">{children}</div>
        </main>
    )
}
export const revalidate = 2
