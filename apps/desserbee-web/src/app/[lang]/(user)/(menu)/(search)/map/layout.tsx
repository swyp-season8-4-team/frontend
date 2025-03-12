export default async function MapLayout({
  bottomSheet,
  sidebar,
  children,
}: {
  bottomSheet: React.ReactNode;
  sidebar: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div className="selection:bg-whte selection:text-white">
      {bottomSheet}
      {sidebar}
      {children}
    </div>
  );
}
