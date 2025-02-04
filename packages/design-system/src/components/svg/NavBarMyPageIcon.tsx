interface MypageIconProps {
  isSelected?: boolean;
}

export function NavBarMyPageIcon({ isSelected }: MypageIconProps) {
  return (
    <svg
      width="23"
      height="25"
      viewBox="0 0 23 25"
      fill={isSelected ? '#FFB700' : 'none'}
      xmlns="http://www.w3.org/2000/svg">
      <path
        d="M11.0453 15.8145C3.77327 15.8145 1.23814 19.8779 0.697189 22.7111C0.573688 23.358 1.11293 23.8949 1.77144 23.8949H20.8405C21.5347 23.8949 22.0837 23.3013 21.8974 22.6326C21.1093 19.8035 18.2503 15.8145 11.0453 15.8145Z"
        stroke="#545454"
        strokeWidth="1.1"
      />
      <circle cx="10.6795" cy="7.06062" r="6.06037" stroke="#545454" strokeWidth="1.1" />
    </svg>
  );
}
