import { getAllDemos } from "@/lib/demos"
import { getAllSimulations } from "@/lib/simulation"
import ActionPanel from "../components/ActionPanel"

export default async function MainLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const demos = await getAllDemos()
  const simulations = await getAllSimulations()

  if (!demos || !simulations) return <div className="p-4">An error occured.</div>

  return (
    <main className="flex oveflow-hidden">
      <ActionPanel demos={demos} simulations={simulations} />
      <div className="relative grow overflow-auto">{children}</div>
    </main>
  )
}
export const revalidate = 2
