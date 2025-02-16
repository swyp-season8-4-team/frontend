import Icon, { IconSize, type SVGProps } from '..';

export default function IconTarget({ size = IconSize.m, ...props }: SVGProps) {
  return (
    <Icon viewBox="0 0 27 27" size={size} {...props}>
      <circle
        cx="13.4739"
        cy="13.4739"
        r="12.9124"
        stroke="currentColor"
        strokeWidth="1.12282"
      />
      <circle cx="13.4739" cy="13.4738" r="2.24564" fill="currentColor" />
      <path
        d="M13.4739 1.12274V4.49121"
        stroke="currentColor"
        strokeWidth="1.12282"
      />
      <path
        d="M1.1228 13.4738H4.49127"
        stroke="currentColor"
        strokeWidth="1.12282"
      />
      <path
        d="M22.4565 13.4738H25.825"
        stroke="currentColor"
        strokeWidth="1.12282"
      />
      <path
        d="M13.4739 22.4564V25.8249"
        stroke="currentColor"
        strokeWidth="1.12282"
      />
    </Icon>
  );
}
