import Icon, { IconSize, type SVGProps } from '..';

export default function IconCoupon({ size = IconSize.m, ...props }: SVGProps) {
  return (
    <Icon size={size} {...props}>
      <rect x="0.460938" y="0.494141" width="27.6854" height="27.6854" fill="#F6F6F6"/>
      <path fillRule="evenodd" clipRule="evenodd" d="M2.61914 8.40433C2.61914 7.80861 3.10207 7.32568 3.69779 7.32568H24.9113C25.507 7.32568 25.9899 7.80861 25.9899 8.40434V10.9258C24.4875 11.0193 23.2933 12.5108 23.2933 14.3369C23.2933 16.1631 24.4875 17.6545 25.9899 17.748V19.91C25.9899 20.5057 25.507 20.9886 24.9113 20.9886H3.69779C3.10207 20.9886 2.61914 20.5057 2.61914 19.91V17.748C4.12144 17.6544 5.31554 16.163 5.31554 14.3369C5.31554 12.5109 4.12144 11.0195 2.61914 10.9259V8.40433Z" fill="#FFB700"/>
      <ellipse cx="11.9075" cy="11.9992" rx="1.1985" ry="1.4382" stroke="white" strokeWidth="0.719101"/>
      <ellipse cx="17.0012" cy="16.3137" rx="1.1985" ry="1.4382" stroke="white" strokeWidth="0.719101"/>
      <path d="M15.9531 11.2803L11.9082 17.5724" stroke="white" strokeWidth="0.719101" strokeLinecap="round"/>
    </Icon>
  );
}
