import { headers } from 'next/headers';

export default async function MapLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const headerList = await headers();
  const authorization = headerList.get('authorization');
  if (!authorization) {
    return <div>{children}</div>;
  }

  return <div>{children}</div>;
}
