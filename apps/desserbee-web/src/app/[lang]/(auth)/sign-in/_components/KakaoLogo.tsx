import Link from "next/link";

interface Props {
  href: string;
}

export default function KakaoLogo({ href }: Props) {

  return (
    <Link href={href} className="p-4 bg-[#FFE14A] rounded-full">
      <svg className="h-6 w-6 text-black" viewBox="0 0 24 24">
        <path d="M12 3c5.523 0 10 3.582 10 8s-4.477 8-10 8c-.555 0-1.1-.036-1.63-.107L6 21l.76-4.455C4.965 15.227 2 13.305 2 11c0-4.418 4.477-8 10-8z" />
      </svg>
    </Link>
  )
}