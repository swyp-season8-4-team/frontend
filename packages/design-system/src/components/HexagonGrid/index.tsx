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
        imgSrc ? 'before:bg-[#D2D2D2]' : 'before:bg-primary',
        className,
      )}
    >
      {content && (
        <div className="absolute inset-0 flex-col justify-center items-center px-1 font-bold text-[10px] text-white md:text-[16.8px] text-center leading-none ">
          <div className="flex flex-col justify-center items-center h-full">
            {content.split(' ').map((word, index) => (
              <span key={index} className="block w-full">
                {word}
              </span>
            ))}
          </div>
        </div>
      )}

      {imgSrc && (
        <div className="absolute inset-0 w-full h-full overflow-hidden">
          <img
            src={imgSrc}
            className="[clip-path:polygon(25%_0%,75%_0%,100%_50%,75%_100%,25%_100%,0%_50%)] w-full h-full object-cover"
          />
        </div>
      )}
    </div>
  );
}

export function HexagonGrid({
  contents,
  storeImages,
}: {
  contents: string[];
  storeImages?: string[];
}) {
  const hexagonConfig: HexagonConfig[] = [
    { type: 'text', position: 'top-[10%] left-0' },
    { type: 'text', position: 'top-[26%] left-[29%]' },
    { type: 'text', position: 'top-[10%] left-[58%]' },
    { type: 'image', position: 'top-[43%] left-0' },
    { type: 'image', position: 'top-[59%] left-[29%]' },
    { type: 'image', position: 'top-[43%] left-[58%]' },
  ];

  // storeImages가 있을 때 이미지 배열 처리
  const processedImages = storeImages && storeImages.length > 0
    ? [
        storeImages[0],
        storeImages[1] || storeImages[0], // 두 번째 이미지가 없으면 첫 번째 이미지 사용
        storeImages[2] || storeImages[0]  // 세 번째 이미지가 없으면 첫 번째 이미지 사용
      ]
    : undefined;

  return (
    <div className="relative w-[155px] md:w-[247.29px] md:max-w-[250px] aspect-square">
      {hexagonConfig.map((config, index) => (
        <Hexagon
          key={index}
          className={config.position}
          content={config.type === 'text' ? contents[index] : undefined}
          imgSrc={
            config.type === 'image' && processedImages
              ? processedImages[index - 3]
              : undefined
          }
        />
      ))}
    </div>
  );
}
