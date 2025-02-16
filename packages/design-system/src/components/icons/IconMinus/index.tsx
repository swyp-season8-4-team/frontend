import Icon, { IconSize, type SVGProps } from '..';

export default function IconMinus({ size = IconSize.m, ...props }: SVGProps) {
  return (
    <Icon viewBox="0 0 12 12" size={size} {...props}>
      <path
        d="M1.38892 1.24835H13.5589"
        stroke="currentColor"
        strokeWidth="1.30392"
        strokeLinecap="round"
      />
    </Icon>
  );
}
