import Icon, { IconSize, type SVGProps } from '..';

export default function IconProfileOutline({
  size = IconSize.m,
  ...props
}: SVGProps) {
  return (
    <Icon viewBox="0 0 25 25" size={size} {...props}>
      <path
        d="M12.1714 15.8824C4.40372 15.8824 1.69949 19.9705 1.12478 22.817C0.994453 23.4624 1.53383 24 2.19234 24H22.7072C23.4037 24 23.953 23.4023 23.7556 22.7344C22.9154 19.8922 19.8644 15.8824 12.1714 15.8824Z"
        fill="currentColor"
        stroke="#545454"
        strokeWidth="1.1"
      />
      <ellipse
        cx="11.7812"
        cy="7.08813"
        rx="6.46875"
        ry="6.08813"
        fill="currentColor"
        stroke="#545454"
        strokeWidth="1.1"
      />
    </Icon>
  );
}
