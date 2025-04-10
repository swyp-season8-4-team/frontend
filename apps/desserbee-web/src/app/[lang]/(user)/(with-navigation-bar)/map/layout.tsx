import { HeaderContainer } from '../../_components/HeaderContainer';

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
      <HeaderContainer />
      {bottomSheet}
      {sidebar}
      {children}
    </div>
  );
}
