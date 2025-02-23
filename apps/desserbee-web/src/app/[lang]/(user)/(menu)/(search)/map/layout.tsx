import { headers } from 'next/headers';

export default async function MapLayout({
  bottomSheet,
  sidebar,
  children,
}: {
  bottomSheet: React.ReactNode;
  sidebar: React.ReactNode;
  children: React.ReactNode;
}) {
  const headerList = await headers();
  const authorization = headerList.get('authorization');
  if (!authorization) {
    return (
      <div>
        {bottomSheet}
        {sidebar}
        {children}
      </div>
    );
  }

  return (
    <div>
      {bottomSheet}
      {sidebar}
      {children}
    </div>
  );
}
