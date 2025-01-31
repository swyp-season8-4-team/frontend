"use client";

import useNaverMap from "@/hooks/useNaverMap";

export function NaverMap() {
  const { mapRef } = useNaverMap();

  const CATEGORIES = ["트렌디", "할매픽", "글루텐프리", "로우슈가", "요즘감성"];
  return (
    <div ref={mapRef} className="w-full h-[400px] relative">
      <div className="absolute z-10 top-4 left-4 flex flex-wrap gap-2">
        {CATEGORIES.map((category) => (
          <button
            className="bg-white px-4 py-2 rounded-full shadow-md hover:bg-gray-100 transition-colors duration-200 text-sm font-medium"
            key={category}>
            {category}
          </button>
        ))}
      </div>
    </div>
  );
}
