interface StoreCardProps {
  img?: string;
  name: string;
  tag: string[];
  description: string;
}
export default function StoreCard({ name, tag, description }: StoreCardProps) {
  return (
    <div className="m-auto h-[30vh] w-[95%] cursor-pointer">
      <div className="h-[70%] w-full rounded-md">
        사진
      </div>
      <div className="flex items-center justify-between">
        <p className="p-1 text-[20px] font-bold">{name}</p>
        <div>
          {tag.map((item, idx) => (
            <span key={idx} className="mr-1 text-[#424242]">
              {item}
              {idx !== tag.length - 1 && ','}
            </span>
          ))}
        </div>
      </div>
      <p className="p-1 w-full truncate text-[#424242]">{description}</p>
    </div>
  );
}
