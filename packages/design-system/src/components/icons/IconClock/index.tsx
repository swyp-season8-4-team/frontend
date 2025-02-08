import Icon, { IconSize, type SVGProps } from '..';

export default function IconClock({ size = IconSize.m, ...props }: SVGProps) {
  return (
    <Icon size={size} {...props}>
      <circle cx="7" cy="7" r="7" fill="currentColor" />
      <path d="M6 3V7.5L9 10.5" stroke="white" strokeLinecap="round" />
    </Icon>
  );
}
