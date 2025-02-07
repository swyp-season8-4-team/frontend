import Icon, { IconSize, type SVGProps } from '..';

export default function IconLocation({
  size = IconSize.m,
  ...props
}: SVGProps) {
  return (
    <Icon size={size} {...props}>
      <path
        d="M1.22619 20.4722L10.2837 1.79979C10.6434 1.05831 11.6952 1.04575 12.0725 1.77843L21.7108 20.4963C22.1418 21.3333 21.2828 22.2478 20.4205 21.87L11.5702 17.9932C11.3073 17.878 11.0076 17.8814 10.7473 18.0024L2.54758 21.8154C1.69459 22.212 0.815635 21.3185 1.22619 20.4722Z"
        fill="currentColor"
        stroke="currentColor"
        strokeWidth="1.1"
      />
    </Icon>
  );
}
