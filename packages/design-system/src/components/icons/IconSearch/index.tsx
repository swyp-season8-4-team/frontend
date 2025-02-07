import Icon, { IconSize, type SVGProps } from '..';

export default function IconSearch({ size = IconSize.m, ...props }: SVGProps) {
  return (
    <Icon size={size} {...props}>
      <circle
        cx="8.51613"
        cy="8.51613"
        r="7.35484"
        stroke="currentColor"
        strokeWidth="2.32258"
      />
      <path
        d="M20.7134 22.0704C21.1894 22.5002 21.9237 22.4628 22.3536 21.9868C22.7834 21.5108 22.746 20.7765 22.27 20.3466L20.7134 22.0704ZM13.2217 15.3052L20.7134 22.0704L22.27 20.3466L14.7783 13.5814L13.2217 15.3052Z"
        fill="currentColor"
      />
    </Icon>
  );
}
