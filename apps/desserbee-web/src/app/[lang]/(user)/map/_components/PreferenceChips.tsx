import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@repo/ui/components/carousel";

interface PreferenceTagsProps {
  categories: string[];
}

export function PreferenceChips({ categories }: PreferenceTagsProps) {
  return (
    <Carousel
      className="absolute z-10 top-4 left-[18px] w-[80%] overflow-x-hidden"
      opts={{
        align: "start",
        dragFree: true,
        containScroll: "trimSnaps",
      }}>
      <CarouselContent className="-ml-2 ">
        {categories.map((category) => (
          <CarouselItem
            key={category}
            className={`pl-2 basis-1/${categories.length}`}>
            <button className="text-lg select-none bg-white px-4 py-2 rounded-[48.78px] shadow-xl font-medium">
              {category}
            </button>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}
