import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@repo/ui/components/carousel';

import { Tag } from '@repo/design-system/components/Tag';
interface PreferenceTagsProps {
  categories: string[];
}

export function PreferenceTags({ categories }: PreferenceTagsProps) {
  return (
    <Carousel
      className="top-4 left-[18px] z-10 absolute w-full"
      opts={{
        align: 'start',
        dragFree: true,
        containScroll: 'trimSnaps',
      }}
    >
      <CarouselContent className="-ml-2">
        {categories.map((category) => (
          <CarouselItem
            key={category}
            className={`pl-2 basis-1/${categories.length} text-nowrap`}
          >
            <div className="px-1 py-1">
              <Tag>{category}</Tag>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}
