import Icon, { IconSize, type SVGProps } from '..';

export default function IconHamburger({
  size = IconSize.m,
  ...props
}: SVGProps) {
  return (
    <Icon size={size} viewBox="0 0 29 28" {...props}>
      <path
        d="M5.49658 8H22.9966"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M5.49658 14H22.9966"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M5.49658 20H22.9966"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </Icon>
  );
}
