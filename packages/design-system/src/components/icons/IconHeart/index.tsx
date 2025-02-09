import Icon, { IconSize, type SVGProps } from '..';

export default function IconHeart({ size = IconSize.m, ...props }: SVGProps) {
  return (
    <Icon size={size} {...props}>
      <circle cx="13" cy="13.5" r="12.85" stroke="#714115" strokeWidth="0.3"/>
      <path
        d="M13.434 20.4393C13.196 20.5202 12.804 20.5202 12.566 20.4393C10.536 19.7719 6 16.9876 6 12.2685C6 10.1854 7.743 8.5 9.892 8.5C11.166 8.5 12.293 9.09326 13 10.0101C13.707 9.09326 14.841 8.5 16.108 8.5C18.257 8.5 20 10.1854 20 12.2685C20 16.9876 15.464 19.7719 13.434 20.4393Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Icon>
  );
}
