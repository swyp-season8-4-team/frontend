import { Carousel, CarouselContent, CarouselItem } from '@repo/ui/components/carousel';

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
      }}>
      <CarouselContent className="-ml-2">
        {categories.map((category) => (
          <CarouselItem key={category} className={`pl-2 basis-1/${categories.length} text-nowrap`}>
            <div className="px-1 py-1">
              <button className="bg-white shadow-base px-4 py-2 rounded-[48.78px] min-w-[104px] font-medium text-[#393939] text-lg select-none">
                {category}
              </button>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}
