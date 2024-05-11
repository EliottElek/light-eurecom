import { getAllDemos } from "@/lib/demos"
import { getAllSimulations } from "@/lib/simulation"
import ActionPanel from "@/components/ActionPanel"
import ErrorDialog from "@/components/ErrorDialog"

export default async function SimulationLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const demos = await getAllDemos()
    const simulations = await getAllSimulations()

    if (!demos || !simulations) return <main className="flex h-full grow oveflow-hidden">
        <div className="w-[285px]">
            <ActionPanel demos={[]} simulations={[]} />
        </div>
        <ErrorDialog error={"Could not reach the server."} details={'An error occured trying to reach the server. Come back later or contact support.'} />
    </main>

    return (
        <main className="flex h-screen oveflow-hidden">
            <div className="w-[285px]">
                <ActionPanel demos={demos} simulations={simulations} />
            </div>
            <div className="relative grow overflow-auto">{children}</div>
        </main>
    )
}
export const revalidate = 2
