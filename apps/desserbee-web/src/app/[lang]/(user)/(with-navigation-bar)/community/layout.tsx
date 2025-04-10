export default async function CommunityLayout({
  children,
}: {
  bottomSheet: React.ReactNode;
  sidebar: React.ReactNode;
  children: React.ReactNode;
}) {
  return <div>{children}</div>;
}
