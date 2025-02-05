import Icon, { IconSize, type SVGProps } from '..';

export default function IconFilter({ size = IconSize.m, ...props }: SVGProps) {
  return (
    <Icon size={size} {...props}>
      <path
        d="M1 3L33 3"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M1 19L33 19"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <circle
        cx="21.5"
        cy="3.5"
        r="2.5"
        fill="white"
        stroke="currentColor"
        strokeWidth="2"
      />
      <circle
        cx="10.5"
        cy="18.5"
        r="2.5"
        fill="white"
        stroke="currentColor"
        strokeWidth="2"
      />
    </Icon>
  );
}
