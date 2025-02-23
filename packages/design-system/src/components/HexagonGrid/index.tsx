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
        'w-[36%] absolute ',
        'before:content-[""] before:block before:pt-[86.6%]',
        'before:[clip-path:polygon(25%_0%,75%_0%,100%_50%,75%_100%,25%_100%,0%_50%)]',
        'before:bg-primary',
        className,
      )}
    >
      {content && (
        <div className="absolute inset-0 flex justify-center items-center font-bold text-[10px] text-white md:text-[16.8px]">
          {content}
        </div>
      )}

      {imgSrc && (
        <div className="absolute inset-0 w-full h-full">
          <img
            src={imgSrc}
            className="[clip-path:polygon(25%_0%,75%_0%,100%_50%,75%_100%,25%_100%,0%_50%)] w-full h-full aspect-square"
          />
        </div>
      )}
    </div>
  );
}

export function HexagonGrid({
  contents,
  ownerPickImages,
}: {
  contents: string[];
  ownerPickImages?: string[];
}) {
  const hexagonConfig: HexagonConfig[] = [
    { type: 'text', position: 'top-[10%] left-0' },
    { type: 'text', position: 'top-[26%] left-[29%]' },
    { type: 'text', position: 'top-[10%] left-[58%]' },
    { type: 'image', position: 'top-[43%] left-0' },
    { type: 'image', position: 'top-[59%] left-[29%]' },
    { type: 'image', position: 'top-[43%] left-[58%]' },
  ];

  return (
    <div className="relative w-[155px] md:w-[247.29px] md:max-w-[250px] aspect-square">
      {hexagonConfig.map((config, index) => (
        <Hexagon
          key={index}
          className={config.position}
          content={config.type === 'text' ? contents[index] : undefined}
          imgSrc={
            config.type === 'image' && ownerPickImages
              ? ownerPickImages[index - 3]
              : undefined
          }
        />
      ))}
    </div>
  );
}
