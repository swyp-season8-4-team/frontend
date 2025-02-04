interface MapIconProps {
  isSelected?: boolean;
}

export function NavBarMapIcon({ isSelected }: MapIconProps) {
  return (
    <svg width="19" height="26" viewBox="0 0 19 26" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M1.04699 10.8649C1.40371 14.3071 5.72716 20.9928 8.60431 24.9188C9.00152 25.4608 9.80728 25.4483 10.1909 24.8966C12.9644 20.907 17.434 13.9105 17.9091 10.8649C18.5627 6.67568 15.687 1 9.4127 1C3.13842 1 0.615335 6.69951 1.04699 10.8649Z"
        fill={isSelected ? '#FFB700' : 'white'}
        stroke="#545454"
        strokeWidth="1.1"
      />
      <circle cx="9.5" cy="9.5" r="3.95" fill="white" stroke="#545454" strokeWidth="1.1" />
    </svg>
  );
}
