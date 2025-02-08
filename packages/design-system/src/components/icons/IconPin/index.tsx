import Icon, { IconSize, type SVGProps } from '..';

export default function IconPin({ size = IconSize.m, ...props }: SVGProps) {
  return (
    <Icon size={size} {...props}>
      <path
        d="M2.00138 11.1846L6.30857 16.4489C6.46861 16.6445 6.7677 16.6445 6.92774 16.4489L11.2349 11.1846C12.5166 9.61811 13.4117 7.67227 13.0138 5.6878C12.4619 2.93526 10.763 0 6.61816 0C2.47327 0 0.77445 2.93527 0.222519 5.68781C-0.175398 7.67228 0.719731 9.61811 2.00138 11.1846Z"
        fill="currentColor"
      />
      <circle cx="6.58451" cy="5.12138" r="2.19486" fill="white" />
    </Icon>
  );
}
