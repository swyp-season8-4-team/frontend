type Props = {
  name: string;
};
export default function NoticeTag({ name }: Props) {
  return(
    <div className="rounded-lg bg-[#1D9EA2] text-white font-semibold
    text-center p-1">
      <p>{name}</p>
    </div>
  )
}
