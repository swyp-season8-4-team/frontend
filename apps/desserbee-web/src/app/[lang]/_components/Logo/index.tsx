import Image from 'next/image';
import ReadyBee from '@/assets/images/bee_icon_ready.png';
interface LogoProps {
  width: number;
  height: number;
}

export function Logo({ width, height }: LogoProps) {
  return <Image src={ReadyBee} width={width} height={height} alt="logo" />;
}
