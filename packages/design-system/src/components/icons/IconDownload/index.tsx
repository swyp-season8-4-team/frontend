import Icon, { IconSize, type SVGProps } from '..';

export default function IconDownload({
  size = IconSize.m,
  ...props
}: SVGProps) {
  return (
    <Icon size={size} {...props}>
      <path d="M12 17V3" stroke="currentColor" />
      <path d="m6 11 6 6 6-6" stroke="currentColor" />
      <path d="M19 21H5" stroke="currentColor" />
    </Icon>
  );
}
