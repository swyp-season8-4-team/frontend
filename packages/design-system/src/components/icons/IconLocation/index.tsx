import Icon, { IconSize, type SVGProps } from '..';

export default function IconLocation({
  size = IconSize.m,
  ...props
}: SVGProps) {
  return (
    <Icon viewBox="0 0 16 16" size={size} {...props}>
      <path
        d="M1.22619 13.4722L6.88816 1.79979C7.24784 1.05831 8.29968 1.04575 8.67695 1.77843L14.7108 13.4963C15.1418 14.3333 14.2828 15.2478 13.4205 14.87L8.17472 12.5721C7.91181 12.457 7.61209 12.4603 7.35183 12.5813L2.54758 14.8154C1.69459 15.212 0.815635 14.3185 1.22619 13.4722Z"
        fill="currentColor"
      />
    </Icon>
  );
}
