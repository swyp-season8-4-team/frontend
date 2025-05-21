import Icon, { IconSize, type SVGProps } from '..';

export default function IconCalendar({
  size = IconSize.m,
  ...props
}: SVGProps) {
  return (
    <Icon size={size} viewBox="0 0 24 24" {...props}>
        <path
          d="M21.9299 6.76099L18.5599 20.291C18.3199 21.301 17.4199 22.001 16.3799 22.001H3.23989C1.72989 22.001 0.649901 20.5209 1.0999 19.0709L5.30989 5.55103C5.59989 4.61103 6.46991 3.96094 7.44991 3.96094H19.7499C20.6999 3.96094 21.4899 4.54094 21.8199 5.34094C22.0099 5.77094 22.0499 6.26099 21.9299 6.76099Z"
          stroke="white"
          strokeWidth="1.5"
          strokeMiterlimit="10"
        />
        <path
          d="M16 22H20.78C22.07 22 23.08 20.91 22.99 19.62L22 6"
          stroke="white"
          strokeWidth="1.5"
          strokeMiterlimit="10"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M9.67993 6.38049L10.7199 2.06055"
          stroke="white"
          strokeWidth="1.5"
          strokeMiterlimit="10"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M16.3799 6.39075L17.3199 2.05078"
          stroke="white"
          strokeWidth="1.5"
          strokeMiterlimit="10"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M7.69995 12H15.7"
          stroke="white"
          strokeWidth="1.5"
          strokeMiterlimit="10"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M6.69995 16H14.7"
          stroke="white"
          strokeWidth="1.5"
          strokeMiterlimit="10"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
    </Icon>
  );
}
