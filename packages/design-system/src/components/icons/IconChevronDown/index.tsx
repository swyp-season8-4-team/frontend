import Icon, { IconSize, type SVGProps } from '..';

export default function IconChevronDown({
  size = IconSize.m,
  ...props
}: SVGProps) {
  return (
    <Icon size={size} {...props}>
      <path
        d="M3.02743 8.75495C2.65753 8.41086 2.65753 7.84496 3.02743 7.50086C3.387 7.16638 3.963 7.16638 4.32257 7.50086L12 14.6427L19.6774 7.50086C20.037 7.16638 20.613 7.16638 20.9726 7.50086C21.3425 7.84496 21.3425 8.41085 20.9726 8.75495L12.6476 16.4991C12.288 16.8336 11.712 16.8336 11.3524 16.4991L3.02743 8.75495Z"
        fill="currentColor"
      />
    </Icon>
  );
}
