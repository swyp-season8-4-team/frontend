import Icon, { IconSize, type SVGProps } from '..';

export default function IconClock({ size = IconSize.m, ...props }: SVGProps) {
  return (
    <Icon viewBox="0 0 16 16" size={size} {...props}>
      <circle cx="8" cy="8" r="8" fill="currentColor" />
      <path
        d="M6.85742 3.42857V8.57143L10.286 12"
        stroke="white"
        strokeLinecap="round"
      />
    </Icon>
  );
}
