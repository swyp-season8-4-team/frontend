import Icon, { IconSize, type SVGProps } from '..';

export default function IconCheck({ size = IconSize.m, ...props }: SVGProps) {
  return (
    <Icon viewBox="0 0 12 12" size={size} {...props}>
      <path
        d="M1 3.5L3.85826 7.58323C4.20042 8.07202 4.89172 8.15436 5.33911 7.75961L13 1"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </Icon>
  );
}
