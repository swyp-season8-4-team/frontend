interface props {
  title?: string;
  content: string;
}

export function ShopInfoCard(data: props) {
  return (
    <div className="flex w-full py-2 gap-2">
      <p className="text-[#4B4B4B] w-[20%]">{data.title}</p>
      <p>{data.content}</p>
    </div>
  );
}
