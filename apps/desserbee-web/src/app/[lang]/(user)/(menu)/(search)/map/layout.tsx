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
    <div className="select-none">
      {bottomSheet}
      {sidebar}
      {children}
    </div>
  );
}
