interface selectedProps {
  name: string;
  detailTitle:string;
  value:number;
}
export default function ChartDetail({name,detailTitle,value}: selectedProps){
  return(
    <div className="flex flex-col px-7">
      <div className="flex gap-1 text-[#635F59]">
          <p>{name}</p>
          <p>{detailTitle}</p>
      </div>
      <div className="font-bold text-2xl text-[#3F3C39]">
        {value}
      </div>
    </div>
  )
}