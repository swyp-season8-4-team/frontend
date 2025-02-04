import Icon, { IconSize, type SVGProps } from '..';

export default function IconBookmark({
  size = IconSize.m,
  ...props
}: SVGProps) {
  return (
    <Icon size={size} {...props}>
      <path
        d="M14.12 0.5H3.88C2.22 0.5 0.880005 1.84 0.880005 3.5V20.31C0.880005 21.23 1.88 21.79 2.67 21.32L8.99 18.73L15.34 21.33C16.13 21.8 17.13 21.23 17.13 20.32V3.5C17.12 1.84 15.78 0.5 14.12 0.5Z"
        fill="currentColor"
        transform="translate(3, 1)"
      />
    </Icon>
  );
}
