import type { StoreDetailInfoData } from '@repo/entity/src/store';

interface DessertMateTabProps {
  mate: StoreDetailInfoData['mate'];
}
export function DessertMateTab({ mate }: DessertMateTabProps) {
  return (
    <div>
      <div></div>
      {mate.map((item) => (
        <div>item.</div>
      ))}

      <div>
        <div>\</div>
      </div>
    </div>
  );
}
