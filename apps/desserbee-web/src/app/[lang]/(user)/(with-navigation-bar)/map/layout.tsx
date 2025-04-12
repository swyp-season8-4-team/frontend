import { HeaderContainer } from '../../_components/HeaderContainer';
import { SearchBarContainer } from '../../_components/SearchBarContainer';

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
      <HeaderContainer>
        <div className="bg-primary-80">
          <SearchBarContainer />
        </div>
      </HeaderContainer>
      {bottomSheet}
      {sidebar}
      {children}
    </div>
  );
}
