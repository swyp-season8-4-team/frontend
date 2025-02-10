import { cn } from '@repo/ui/lib/utils';

type HexagonType = 'text' | 'image';

interface HexagonConfig {
  type: HexagonType;
  position: string; // Tailwind 클래스
}

interface HexagonProps {
  className: string;
  content?: string;
  imgSrc?: string;
  bgColor?: string;
}

function Hexagon({ className, content, imgSrc }: HexagonProps) {
  return (
    <div
      className={cn(
        'w-[35%] absolute ',
        'before:content-[""] before:block before:pt-[86.6%]',
        'before:[clip-path:polygon(25%_0%,75%_0%,100%_50%,75%_100%,25%_100%,0%_50%)]',
        'before:bg-primary',
        className,
      )}
    >
      {content && (
        <div className="absolute inset-0 flex justify-center items-center text-white text-[16.8px] font-bold">
          {content}
        </div>
      )}

      {imgSrc && (
        <div className="absolute inset-0 w-full h-full">
          <img
            src={imgSrc}
            className=" w-full h-full aspect-square [clip-path:polygon(25%_0%,75%_0%,100%_50%,75%_100%,25%_100%,0%_50%)]"
          />
        </div>
      )}
    </div>
  );
}

export function HexagonGrid({
  contents,
  previewImages,
}: {
  contents: string[];
  previewImages: string[];
}) {
  const hexagonConfig: HexagonConfig[] = [
    { type: 'text', position: 'top-0 left-0' },
    { type: 'text', position: 'top-[17%] left-[28%]' },
    { type: 'text', position: 'top-0 left-[56%]' },
    { type: 'image', position: 'top-[33%] left-0' },
    { type: 'image', position: 'top-[49%] left-[28%]' },
    { type: 'image', position: 'top-[33%] left-[56%]' },
  ];

  return (
    <div className="relative aspect-square w-[90vw] h-[90vw] max-w-[300px] max-h-[300px] ">
      {hexagonConfig.map((config, index) => (
        <Hexagon
          key={index}
          className={config.position}
          content={config.type === 'text' ? contents[index] : undefined}
          imgSrc={
            config.type === 'image' ? previewImages[index - 3] : undefined
          }
        />
      ))}
    </div>
  );
}
