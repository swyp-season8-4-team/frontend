type Props = {
  name: string;
};

export default function NoticeTag({ name }: Props) {
  const bgColor =
    name === '알림'
      ? 'bg-[#1D9EA2]'
      : name === '긴급'
      ? 'bg-red-500'
      : name === '일반'
      ? 'bg-[#FFC858]'
      : 'bg-gray-300'; // 기본값

  return (
    <div
      className={`rounded-lg ${bgColor} text-white font-semibold text-center p-1`}
    >
      <p>{name}</p>
    </div>
  );
}
