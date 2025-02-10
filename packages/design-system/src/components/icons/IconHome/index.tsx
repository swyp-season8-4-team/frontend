import Icon, { IconSize, type SVGProps } from '..';

export default function IconHome({ size = IconSize.m, ...props }: SVGProps) {
  return (
    <Icon viewBox="0 0 18 18" size={size} {...props}>
      <path
        d="M1 16L1.04432 6.11399C1.04432 5.61271 1.30138 5.13612 1.72687 4.82384L7.93185 0.345147C8.57008 -0.115049 9.46538 -0.115049 10.1125 0.345147L16.3175 4.81562C16.7518 5.12789 17 5.60449 17 6.11399V16"
        fill="currentColor"
      />
      <path
        d="M12.0155 8H5.98469C5.26961 8 4.69238 8.41766 4.69238 8.93506V14.8571H13.3078V8.93506C13.3078 8.41766 12.7305 8 12.0155 8Z"
        fill="white"
      />
      <path d="M1 16H17" stroke="currentColor" strokeLinecap="round" />
    </Icon>
  );
}
