import Icon, { IconSize, type SVGProps } from '..';
// 새로운 디자인에서 사용하는 북마크 아이콘 (앱 디자인 - 웹도 앱 디자인대로 업데이트 중)
export default function IconBookmark2({
  size = IconSize.m,
  ...props
}: SVGProps) {
  return (
    <Icon size={size} viewBox="0 0 10 12" {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M0.556641 2.11003C0.556641 1.668 0.732235 1.24408 1.0448 0.931515C1.35736 0.618954 1.78128 0.443359 2.22331 0.443359H7.77886C8.22089 0.443359 8.64481 0.618954 8.95737 0.931515C9.26993 1.24408 9.44553 1.668 9.44553 2.11003V11.0145C9.44553 11.6922 8.67886 12.0867 8.12775 11.6928L5.00108 9.45947L1.87442 11.6928C1.32275 12.0872 0.556641 11.6928 0.556641 11.015V2.11003Z"
        fill="currentColor"
      />
    </Icon>
  );
}
