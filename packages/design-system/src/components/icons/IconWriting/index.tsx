import Icon, { IconSize, type SVGProps } from '..';

export default function IconWriting({ size = IconSize.m, ...props }: SVGProps) {
  return (
    <Icon viewBox="0 0 7.65 7.65" size={size} {...props}>
      <path
        d="M4.22609 1.14743L1.60917 3.91735C1.51035 4.02254 1.41473 4.22972 1.3956 4.37316L1.27767 5.4059C1.23623 5.77884 1.50398 6.03384 1.87373 5.97009L2.9001 5.79478C3.04353 5.76928 3.24434 5.66409 3.34316 5.55571L5.96008 2.78579C6.4127 2.30767 6.6167 1.76261 5.91227 1.09643C5.21102 0.436618 4.67871 0.669304 4.22609 1.14743Z"
        stroke="currentColor"
        strokeWidth="0.478122"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M3.79102 1.60962C3.92808 2.48936 4.64207 3.16192 5.52819 3.25117"
        stroke="currentColor"
        strokeWidth="0.478122"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M0.957031 7.01245H6.6945"
        stroke="currentColor"
        strokeWidth="0.478122"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Icon>
  );
}
