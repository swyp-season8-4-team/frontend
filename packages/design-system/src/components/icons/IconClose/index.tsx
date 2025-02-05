import Icon, { IconSize, type SVGProps } from '..';

export default function IconClose({ size = IconSize.m, ...props }: SVGProps) {
  return (
    <Icon size={size} {...props}>
      <path
        d="M12 3.25C7.17 3.25 3.25 7.17 3.25 12C3.25 16.83 7.17 20.75 12 20.75C16.83 20.75 20.75 16.83 20.75 12C20.75 7.17 16.83 3.25 12 3.25ZM16.49 15.43C16.78 15.72 16.78 16.2 16.49 16.49C16.34 16.64 16.15 16.71 15.96 16.71C15.77 16.71 15.58 16.64 15.43 16.49L12 13.06L8.57 16.49C8.42 16.64 8.23 16.71 8.04 16.71C7.85 16.71 7.66 16.64 7.51 16.49C7.22 16.2 7.22 15.72 7.51 15.43L10.94 12L7.51 8.57C7.22 8.28 7.22 7.8 7.51 7.51C7.8 7.22 8.28 7.22 8.57 7.51L12 10.94L15.43 7.51C15.72 7.22 16.2 7.22 16.49 7.51C16.78 7.8 16.78 8.28 16.49 8.57L13.06 12L16.49 15.43Z"
        fill="currentColor"
      />
    </Icon>
  );
}
