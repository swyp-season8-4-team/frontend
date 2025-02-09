import Icon, { IconSize, type SVGProps } from '..';

export default function IconBaseball({
  size = IconSize.m,
  ...props
}: SVGProps) {
  return (
    <Icon size={size} {...props}>
      <path
        d="M8 16C12.4183 16 16 12.4183 16 8C16 3.58172 12.4183 0 8 0C3.58172 0 0 3.58172 0 8C0 12.4183 3.58172 16 8 16Z"
        fill="currentColor"
      />
      <path
        d="M4.50391 0.800026L7.04791 3.96003C8.75191 6.07203 9.95991 8.52803 10.5999 11.16L11.5679 15.152"
        stroke="white"
        strokeWidth="0.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M2.7998 13.896C4.8798 10.256 8.88781 8.16801 13.0638 8.54401L15.5998 8.77601"
        stroke="white"
        strokeWidth="0.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M13.2004 2.23206C11.1204 5.87206 7.11239 7.96005 2.93639 7.58406L0.400391 7.35206"
        stroke="white"
        strokeWidth="0.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Icon>
  );
}
