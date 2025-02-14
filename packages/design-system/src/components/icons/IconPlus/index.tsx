import Icon, { IconSize, type SVGProps } from '..';

export default function IconPlus({ size = IconSize.m, ...props }: SVGProps) {
  return (
    <Icon viewBox="0 0 13 13" size={size} {...props}>
      <path
        d="M1.38892 7.03265H13.5589"
        stroke="currentColor"
        strokeWidth="1.30392"
        strokeLinecap="round"
      />
      <path
        d="M7.47388 13.1176L7.47388 0.947681"
        stroke="currentColor"
        strokeWidth="1.30392"
        strokeLinecap="round"
      />
    </Icon>
  );
}
