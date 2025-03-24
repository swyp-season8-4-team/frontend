import Icon, { IconSize, type SVGProps } from '..';

export default function IconPicture2({
  size = IconSize.m,
  ...props
}: SVGProps) {
  return (
    <Icon viewBox="0 0 30 30" size={size} {...props}>
      <path
        d="M11.4828 26.7246H18.5173C24.3793 26.7246 26.7242 24.3798 26.7242 18.5177V11.4833C26.7242 5.62119 24.3793 3.27637 18.5173 3.27637H11.4828C5.62071 3.27637 3.27588 5.62119 3.27588 11.4833V18.5177C3.27588 24.3798 5.62071 26.7246 11.4828 26.7246Z"
        stroke="currentColor"
        strokeWidth="1.75862"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M11.483 12.6552C12.778 12.6552 13.8278 11.6054 13.8278 10.3104C13.8278 9.01539 12.778 7.96558 11.483 7.96558C10.188 7.96558 9.13818 9.01539 9.13818 10.3104C9.13818 11.6054 10.188 12.6552 11.483 12.6552Z"
        stroke="currentColor"
        strokeWidth="1.75862"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M4.06201 23.1478L9.84201 19.2671C10.7682 18.6457 12.1048 18.7161 12.9372 19.4312L13.3241 19.7712C14.2386 20.5568 15.7158 20.5568 16.6303 19.7712L21.5075 15.5857C22.422 14.8002 23.8993 14.8002 24.8137 15.5857L26.7248 17.2271"
        stroke="currentColor"
        strokeWidth="1.75862"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Icon>
  );
}
