import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@repo/ui/components/carousel';

import { Tag } from '@repo/design-system/components/Tag';
import { cn } from '@repo/ui/lib/utils';
import { useTag } from '../../../../_hooks/useTag';

interface PreferenceTagsProps {
  categories: string[];
  userPreferences: string[];
}

export function PreferenceTags({
  categories,
  userPreferences,
}: PreferenceTagsProps) {
  const {
    isMyPreferSelected,
    selectedCategories,
    handleMyPreferenceTagClick,
    handleTagClick,
  } = useTag();

  return (
    <Carousel
      className="top-4 left-[18px] z-10 absolute w-full"
      opts={{
        align: 'start',
        dragFree: true,
        containScroll: 'trimSnaps',
      }}
    >
      <CarouselContent className="-ml-1">
        <div className="px-1 py-1">
          <Tag
            className={cn(
              'text-3 md:text-lg py-[6px] md:py-2 md:px-3 font-medium select-none text-nowrap text-[#DE8332]',
              isMyPreferSelected && 'text-white bg-[#DE8332]',
            )}
            onClick={() => handleMyPreferenceTagClick(userPreferences)}
          >
            내취향
          </Tag>
        </div>
        {categories.map((category) => (
          <CarouselItem
            key={category}
            className={`pl-2 basis-1/${categories.length} text-nowrap`}
          >
            <div className="px-1 py-1">
              <Tag
                onClick={() => handleTagClick(category)}
                className={cn(
                  'text-3 md:text-lg font-medium py-[6px] md:py-2 md:px-3',
                  selectedCategories.has(category) && 'bg-primary text-white',
                )}
              >
                {category}
              </Tag>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}
