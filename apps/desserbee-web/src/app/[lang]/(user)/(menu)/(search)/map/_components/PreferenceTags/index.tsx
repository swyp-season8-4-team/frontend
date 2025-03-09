import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@repo/ui/components/carousel';

import { Tag } from '@repo/design-system/components/Tag';
import { cn } from '@repo/ui/lib/utils';
import { useContext } from 'react';
import { MyPreferNotSignInModal } from '../../_modals/MyPreferNotSignInModal';
import { PortalContext } from '@repo/ui/contexts/PortalContext';
import type { PreferenceData } from '@repo/entity/src/store';
import { UserContext } from '@/contexts/UserContext';
import PreferenceConverter from '@repo/infrastructures/src/mappers/preferenceConverter';

// FIXME: 리팩토링이 필요한데 지금 할수 없어서 임시 사용 (원래 req, res raw data 변환용)
const preferenceConverter = new PreferenceConverter();

interface PreferenceTagsProps {
  categories: PreferenceData[];
  isMyPreferSelected: boolean;
  selectedCategories: Set<number>;
  handleMyPreferenceTagClick: (userPreferences: number[]) => void;
  updateSelectedTag: (category: number) => void;
}

export function PreferenceTags({
  categories,
  isMyPreferSelected,
  updateSelectedTag,
  selectedCategories,
  handleMyPreferenceTagClick,
}: PreferenceTagsProps) {
  const { push, pop } = useContext(PortalContext);

  const { user } = useContext(UserContext);

  const closeModal = () => {
    pop('modal');
  };

  const handleMyPreferenceBtnClick = () => {
    console.log('My Preference Button Clicked');
    if (user) {
      handleMyPreferenceTagClick(preferenceConverter.convertPreferenceToRaw(user.preferences));
    } else {
      push('modal', {
        component: <MyPreferNotSignInModal onClose={closeModal} />,
      });
    }
  };

  const handleTagClick = (categoryId: number) => {
    console.log('Tag Clicked:', categoryId);
    if (user) {
      updateSelectedTag(categoryId);
    } else {
      push('modal', {
        component: <MyPreferNotSignInModal onClose={closeModal} />,
      });
    }
  };

  return (
    <div>
      <Carousel
        className="top-4 left-[18px] z-10 absolute w-full select-none"
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
                // 'text-3 md:text-lg py-[6px] md:py-2 md:px-3 font-medium select-none text-nowrap text-[#DE8332]',
                'text-3 py-[6px] font-medium select-none text-nowrap text-[#DE8332]',
                isMyPreferSelected && 'text-white bg-[#DE8332]',
              )}
              onClick={() => {
                handleMyPreferenceBtnClick();
              }}
            >
              내취향
            </Tag>
          </div>
          {categories.map((category) => (
            <CarouselItem
              key={category.id}
              className={`pl-2 basis-1/${categories.length} text-nowrap`}
            >
              <div className="px-1 py-1">
                <Tag
                  onClick={() => handleTagClick(category.id)}
                  className={cn(
                    // 'text-3 md:text-lg font-medium py-[6px] md:py-2 md:px-3',
                    'text-3  font-medium py-[6px]',
                    selectedCategories.has(category.id) &&
                      'bg-primary text-white',
                  )}
                >
                  {category.preferenceName}
                </Tag>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
}
