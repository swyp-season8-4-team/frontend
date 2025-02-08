import Icon, { IconSize, type SVGProps } from '..';

export default function IconBaseball({
  size = IconSize.m,
  ...props
}: SVGProps) {
  return (
    <Icon size={size} {...props}>
      <path
        d="M7.99967 14.6666C11.6816 14.6666 14.6663 11.6819 14.6663 7.99998C14.6663 4.31808 11.6816 1.33331 7.99967 1.33331C4.31778 1.33331 1.33301 4.31808 1.33301 7.99998C1.33301 11.6819 4.31778 14.6666 7.99967 14.6666Z"
        fill="currentColor"
      />
      <path
        d="M12.3337 3.19336C10.6003 6.22669 7.26033 7.96669 3.78033 7.65336L1.66699 7.46003"
        stroke="white"
        strokeWidth="0.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M3.66699 12.9133C5.40033 9.87999 8.74033 8.13999 12.2203 8.45332L14.3337 8.64665"
        stroke="white"
        strokeWidth="0.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M5.08691 2L7.20691 4.63333C8.62691 6.39333 9.63358 8.44 10.1669 10.6333L10.9736 13.96"
        stroke="white"
        strokeWidth="0.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Icon>
  );
}
