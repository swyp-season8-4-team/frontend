import Icon, { IconSize, type SVGProps } from '..';

export default function IconHome({ size = IconSize.m, ...props }: SVGProps) {
  return (
    <Icon size={size} {...props}>
      <path
        d="M1 14L1.03601 5.34974C1.03601 4.91112 1.24488 4.49411 1.59058 4.22086L6.63213 0.302003C7.15069 -0.100668 7.87812 -0.100668 8.40388 0.302003L13.4454 4.21367C13.7983 4.48691 14 4.90393 14 5.34974V14"
        fill="currentColor"
      />
      <path
        d="M9.95 7H5.05C4.469 7 4 7.36545 4 7.81818V13H11V7.81818C11 7.36545 10.531 7 9.95 7Z"
        fill="white"
      />
      <path d="M1 14H14" stroke="currentColor" strokeLinecap="round" />
    </Icon>
  );
}
