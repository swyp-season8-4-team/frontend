import Icon, { IconSize, type SVGProps } from '..';

export default function IconStar({ size = IconSize.m, ...props }: SVGProps) {
  return (
    <Icon viewBox="0 0 21 21" size={size} {...props}>
      <path
        d="M10.5 0L12.8574 7.25532H20.4861L14.3143 11.7394L16.6717 18.9947L10.5 14.5106L4.32825 18.9947L6.68565 11.7394L0.513906 7.25532H8.1426L10.5 0Z"
        fill="currentColor"
      />
    </Icon>
  );
}
