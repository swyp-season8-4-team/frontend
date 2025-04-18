export default function OwnerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="flex flex-col overflow-auto">{children}</div>;
}
