import Icon, { IconSize, type SVGProps } from '..';

export default function IconPlusRound({
  size = IconSize.m,
  ...props
}: SVGProps) {
  return (
    <Icon size={size} {...props} viewBox="0 0 20 20">
      <path
        d="M5 10C5 9.44771 5.44772 9 6 9H9V6C9 5.44771 9.44771 5 10 5C10.5523 5 11 5.44771 11 6V9H14C14.5523 9 15 9.44771 15 10C15 10.5523 14.5523 11 14 11H11V14C11 14.5523 10.5523 15 10 15C9.44771 15 9 14.5523 9 14V11H6C5.44772 11 5 10.5523 5 10Z"
        fill="currentColor"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M0 10C0 4.47715 4.47715 0 10 0C15.5228 0 20 4.47715 20 10C20 15.5228 15.5228 20 10 20C4.47715 20 0 15.5228 0 10ZM10 2C5.58172 2 2 5.58172 2 10C2 14.4183 5.58172 18 10 18C14.4183 18 18 14.4183 18 10C18 5.58172 14.4183 2 10 2Z"
        fill="currentColor"
      />
    </Icon>
  );
}
