import Image from 'next/image';
import Link from 'next/link';

interface CommunityMainCardProps {
  path: string;
  imgSrc: string;
  imgAlt: string;
  title: string;
  description: string;
}

export default function CommunityMainCard({
  path,
  imgSrc,
  imgAlt,
  title,
  description,
}: CommunityMainCardProps) {
  return (
    <Link
      href={path}
      className="active:bg-primary-90 flex flex-col items-center justify-between rounded-[20px] bg-white p-4 shadow-[0px_1px_3px_1px_#39393921] focus:bg-[#F2F1ED]"
    >
      <Image src={imgSrc} alt={imgAlt} width={71} height={71} priority />
      <p className="text-primary-20 my-[7px] text-lg font-medium">{title}</p>
      <p className="text-primary-30 whitespace-pre-line text-center text-sm">
        {description}
      </p>
    </Link>
  );
}
