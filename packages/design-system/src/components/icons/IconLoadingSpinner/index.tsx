import Icon, { IconSize, type SVGProps } from '..';

export default function IconLoadingSpinner({
  size = IconSize.m,
  ...props
}: SVGProps) {
  return (
    <Icon size={size} {...props}>
      <g
        clipPath="url(#paint0_angular_2600_76559_clip_path)"
        data-figma-skip-parse="true"
      >
        <g transform="matrix(0 0.052 -0.052 0 52 52)">
          <foreignObject
            x="-1012.68"
            y="-1012.68"
            width="2025.37"
            height="2025.37"
          >
            <div
              style={{
                background:
                  'conic-gradient(from 90deg,rgba(255, 182, 0, 1) 0deg,rgba(255, 183, 0, 0) 360deg)',
                height: '100%',
                width: '100%',
                opacity: 1,
              }}
            ></div>
          </foreignObject>
        </g>
      </g>
      <path
        d="M104 52C104 80.7188 80.7188 104 52 104C23.2812 104 0 80.7188 0 52C0 23.2812 23.2812 0 52 0C80.7188 0 104 23.2812 104 52ZM12.6877 52C12.6877 73.7116 30.2884 91.3123 52 91.3123C73.7116 91.3123 91.3123 73.7116 91.3123 52C91.3123 30.2884 73.7116 12.6877 52 12.6877C30.2884 12.6877 12.6877 30.2884 12.6877 52Z"
        data-figma-gradient-fill='{"type":"GRADIENT_ANGULAR","stops":[{"color":{"r":1.0,"g":0.71666687726974487,"b":0.0,"a":1.0},"position":0.0},{"color":{"r":1.0,"g":0.71764707565307617,"b":0.0,"a":0.0},"position":1.0}],"stopsVar":[{"color":{"r":1.0,"g":0.71666687726974487,"b":0.0,"a":1.0},"position":0.0},{"color":{"r":1.0,"g":0.71764707565307617,"b":0.0,"a":0.0},"position":1.0}],"transform":{"m00":6.3681635275637544e-15,"m01":-104.0,"m02":104.0,"m10":104.0,"m11":6.3681635275637544e-15,"m12":-6.3681635275637544e-15},"opacity":1.0,"blendMode":"NORMAL","visible":true}'
      />
      <defs>
        <clipPath id="paint0_angular_2600_76559_clip_path">
          <path d="M104 52C104 80.7188 80.7188 104 52 104C23.2812 104 0 80.7188 0 52C0 23.2812 23.2812 0 52 0C80.7188 0 104 23.2812 104 52ZM12.6877 52C12.6877 73.7116 30.2884 91.3123 52 91.3123C73.7116 91.3123 91.3123 73.7116 91.3123 52C91.3123 30.2884 73.7116 12.6877 52 12.6877C30.2884 12.6877 12.6877 30.2884 12.6877 52Z" />
        </clipPath>
      </defs>
    </Icon>
  );
}
