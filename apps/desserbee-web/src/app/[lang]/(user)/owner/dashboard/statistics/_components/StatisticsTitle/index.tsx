export default function StatisticsTitle({ title }: { title: string }) {
  return (
    <div className="flex items-center p-2">
      <span className="mr-2 inline-block h-2 w-2 rounded-full bg-[#3ECA61]"></span>
      <p className="text-lg font-semibold">{title}</p>
    </div>
  );
}
