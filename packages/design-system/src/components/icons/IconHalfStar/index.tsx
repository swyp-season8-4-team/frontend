import Icon, { IconSize, type SVGProps } from '..';

export default function IconHalfStar({
  size = IconSize.m,
  filled = 'none',
  ...props
}: SVGProps & { filled: 'left' | 'right' | 'none' | 'full' }) {
  return (
    <Icon size={size} viewBox="0 0 32 30" {...props}>
      <path
        d="M11.0359 9.86269L0 11.4074L7.95133 19.1341L6.02475 30L15.9094 24.9042L16 24.9541V0L11.0359 9.86269Z"
        fill={filled === 'left' || filled === 'full' ? '#FFB700' : '#D2D2D2'}
      />
      <path
        d="M23.9511 19.1542L32 11.5051L20.9252 9.88185L16.0067 0L16 0.00993816V24.8951L25.8031 30L23.9511 19.1542Z"
        fill={filled === 'right' || filled === 'full' ? '#FFB700' : '#D2D2D2'}
      />
    </Icon>
  );
}
