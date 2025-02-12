import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@repo/ui/components/carousel';

import { Tag } from '@repo/design-system/components/Tag';
import { cn } from '@repo/ui/lib/utils';
import { useState } from 'react';

interface PreferenceTagsProps {
  categories: string[];
  userPreferences: string[];
}

export function PreferenceTags({
  categories,
  userPreferences,
}: PreferenceTagsProps) {
  const [selectedCategories, setSelectedCategories] = useState<Set<string>>(
    new Set(),
  );
  const [isMyPreferSelected, setIsMyPreferSelected] = useState(false);

  const handleTagClick = (category: string) => {
    setSelectedCategories((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(category)) {
        newSet.delete(category);
      } else {
        newSet.add(category);
      }
      return newSet;
    });
    setIsMyPreferSelected(false);
  };

  const handleMyPreferenceTagClick = () => {
    setSelectedCategories((prev) => {
      const newSet = new Set([...userPreferences]);
      return newSet;
    });
    setIsMyPreferSelected(true);
  };

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
              'text-lg font-medium select-none text-nowrap text-[#DE8332]',
              isMyPreferSelected && 'text-white bg-[#DE8332]',
            )}
            onClick={handleMyPreferenceTagClick}
          >
            내취향
          </Tag>
        </div>
        {categories.map((category, index) => (
          <CarouselItem
            key={category}
            className={`pl-2 basis-1/${categories.length} text-nowrap`}
          >
            <div className="px-1 py-1">
              <Tag
                onClick={() => handleTagClick(category)}
                className={cn(
                  'text-lg font-medium',
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
