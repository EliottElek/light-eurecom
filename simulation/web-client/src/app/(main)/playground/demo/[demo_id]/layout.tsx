export default async function SimulationLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
      <div className="relative grow">{children}</div>
  )
}
