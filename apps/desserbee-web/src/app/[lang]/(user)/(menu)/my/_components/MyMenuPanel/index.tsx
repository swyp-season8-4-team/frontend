import Link from "next/link";

interface Props {
  item: {
    label: string;
    href: string;
    onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
  }
}

export default function MyMenuPanel({ item }: Props) {
  return (
    <Link
      href={item.href}
      className="border-b border-gray-100 pb-4 last:border-0 flex items-center justify-between w-full"
      onClick={item.onClick}
    >
      <span className="text-gray-700">{item.label}</span>
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M9 18L15 12L9 6" stroke="#CCCCCC" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </Link>
  )
}