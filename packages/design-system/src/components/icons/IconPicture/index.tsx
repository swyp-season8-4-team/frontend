import Icon, { IconSize, type SVGProps } from '..';

export default function IconPicture({ size = IconSize.m, ...props }: SVGProps) {
  return (
    <Icon size={size} viewBox="0 0 23 23" {...props}>
      <path
        d="M8.62435 21.0834H14.3743C19.166 21.0834 21.0827 19.1667 21.0827 14.3751V8.62508C21.0827 3.83341 19.166 1.91675 14.3743 1.91675H8.62435C3.83268 1.91675 1.91602 3.83341 1.91602 8.62508V14.3751C1.91602 19.1667 3.83268 21.0834 8.62435 21.0834Z"
        stroke="currentColor"
        strokeWidth="1.4375"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8.62565 9.58333C9.6842 9.58333 10.5423 8.72521 10.5423 7.66667C10.5423 6.60812 9.6842 5.75 8.62565 5.75C7.56711 5.75 6.70898 6.60812 6.70898 7.66667C6.70898 8.72521 7.56711 9.58333 8.62565 9.58333Z"
        stroke="#545454"
        strokeWidth="1.4375"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M2.55859 18.1599L7.28318 14.9878C8.04026 14.4799 9.13276 14.5374 9.81318 15.122L10.1294 15.3999C10.8769 16.042 12.0844 16.042 12.8319 15.3999L16.8186 11.9786C17.5661 11.3365 18.7736 11.3365 19.5211 11.9786L21.0832 13.3203"
        stroke="currentColor"
        strokeWidth="1.4375"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Icon>
  );
}
