export default function OwnerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen min-h-[100dvh] flex-col">{children}</div>
  );
}
