import { getDemos, getLocalDemos } from "@/lib/demos"
import { getAllSimulations } from "@/lib/simulation"
import ActionPanel from "@/components/ActionPanel"
import LocalDemosPanel from "@/components/LocalDemosPanel"
import Link from "next/link"
import { Logo } from "@/components/landing/Logo"
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
            <div className="!min-w-[320px] md:block hidden h-screen border-r overflow-y-auto">
                <div className='mb-4 border-b p-4'>
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
            </div>
            <div className="w-full overflow-auto">{children}</div>
        </main>
    )
}
export const revalidate = 2
