import Icon, { IconSize, type SVGProps } from "..";

export default function IconInputClose({ size = IconSize.m, ...props }: SVGProps) {
  return (
    <Icon size={size} {...props}>
      <circle cx="12" cy="12" r="12" fill="#D9D9D9"/>
      <g transform="translate(7, 7)">
        <path d="M1 9L9 1" stroke="#393939" strokeWidth="2" strokeLinecap="round"/>
        <path d="M9 9L1 1" stroke="#393939" strokeWidth="2" strokeLinecap="round"/>
      </g>
    </Icon>
  )
}