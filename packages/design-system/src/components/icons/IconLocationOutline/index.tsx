import Icon, { IconSize, type SVGProps } from '..';

export default function IconLocationOutline({
  size = IconSize.m,
  ...props
}: SVGProps) {
  return (
    <Icon viewBox="0 0 24 24" size={size} {...props}>
      <path
        d="M1.72619 20.4722L10.7837 1.79979C11.1434 1.05831 12.1952 1.04575 12.5725 1.77843L22.2108 20.4963C22.6418 21.3333 21.7828 22.2478 20.9205 21.87L12.0702 17.9932C11.8073 17.878 11.5076 17.8814 11.2473 18.0024L3.04758 21.8154C2.19459 22.212 1.31563 21.3185 1.72619 20.4722Z"
        fill="currentColor"
        stroke="#545454"
        strokeWidth="1.1"
      />
    </Icon>
  );
}
