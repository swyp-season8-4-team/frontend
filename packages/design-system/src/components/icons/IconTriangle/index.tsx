import Icon, { IconSize, type SVGProps } from '..';

export default function IconX({ size = IconSize.m, ...props }: SVGProps) {
  return (
    <Icon size={size} {...props}>
      <path d="M6 16H18L12 8L6 16Z" fill="currentColor" />
    </Icon>
  );
}
