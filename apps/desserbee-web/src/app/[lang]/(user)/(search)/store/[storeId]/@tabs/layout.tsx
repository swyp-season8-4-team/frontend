import type { WithChildren } from '@repo/ui/index';
import TabNavigationBar from './_components/TabNavigationBar';

interface TabsLayoutProps extends WithChildren {
  params: Promise<{ storeId: string }>;
}
export default async function TabsLayout({
  children,
  params,
}: TabsLayoutProps) {
  const { storeId } = await params;
  return (
    <section>
      <TabNavigationBar storeId={storeId} />
      <div>{children}</div>
    </section>
  );
}
