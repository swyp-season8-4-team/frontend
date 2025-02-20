import Icon, { IconSize, type SVGProps } from '..';

export default function IconShare({ size = IconSize.m, ...props }: SVGProps) {
  return (
    <Icon size={size} {...props}>
      <circle
        cx="10.7059"
        cy="3.14715"
        r="1.91176"
        fill="currentColor"
        stroke="currentColor"
        strokeWidth="0.764706"
      />
      <circle
        cx="10.7059"
        cy="13.8532"
        r="1.91176"
        fill="currentColor"
        stroke="currentColor"
        strokeWidth="0.764706"
      />
      <circle
        cx="2.29412"
        cy="8.50017"
        r="1.91176"
        fill="currentColor"
        stroke="currentColor"
        strokeWidth="0.764706"
      />
      <path d="M2.67645 7.73521L10.7059 3.14697" stroke="currentColor" />
      <path d="M3.05884 9.26479L11.0882 13.853" stroke="currentColor" />
    </Icon>
  );
}
