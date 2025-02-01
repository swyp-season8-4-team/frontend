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

export function PreferenceTags({ categories }: PreferenceTagsProps) {
  return (
    <Carousel className="absolute z-10 top-4 left-1/2 -translate-x-1/2 w-screen max-w-[calc(100vw-2rem)]  overflow-x-hidden px-4">
      <CarouselContent className="-ml-2">
        {categories.map((category) => (
          <CarouselItem key={category} className="pl-2 basis-auto">
            <button className="select-none bg-white px-4 py-2 rounded-full shadow-xl hover:bg-gray-100 transition-colors duration-200 text-sm font-medium">
              {category}
            </button>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
