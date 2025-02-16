import Icon, { IconSize, type SVGProps } from '..';

export default function IconPlus({ size = IconSize.m, ...props }: SVGProps) {
  return (
    <Icon size={size} {...props}>
      <path
        d="M1 11.6916H22.6916"
        stroke="#6F6F6F"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M12 22.6916L12 1.00001"
        stroke="#6F6F6F"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </Icon>
  );
}
