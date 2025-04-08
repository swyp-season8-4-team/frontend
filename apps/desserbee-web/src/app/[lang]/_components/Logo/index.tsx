import Image from 'next/image';
import beeSvg from '@/assets/svg/logo-bee.svg';
interface LogoProps {
  width: number;
  height: number;
}

export function Logo({ width, height }: LogoProps) {
  return <Image src={beeSvg} width={width} height={height} alt="logo" />;
}
