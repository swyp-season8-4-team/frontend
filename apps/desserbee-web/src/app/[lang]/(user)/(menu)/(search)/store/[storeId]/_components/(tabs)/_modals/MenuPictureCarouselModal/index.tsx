return (
  <CustomModal
    isCloseBtnShow={false}
    onClose={onClose}
    className="top-[50%] p-[21.49px] md:p-[46px] rounded-[6.91px] md:rounded-base w-[90%] md:w-[80%] max-w-[1200px]"
  >
    <div className="h-full">
      <Carousel setApi={setApi} className="relative w-full h-full">
        <div className="flex items-end font-semibold text-[8px] sm:text-base md:text-xl mb-4">
          <div>메뉴 &nbsp;</div>
          <div className="text-[#898989]">{menus.length}</div>
        </div>
        <CarouselContent>
          {Array.from({ length: totalPages }).map((_, pageIndex) => (
            <CarouselItem key={pageIndex} className="w-full">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                {getPageImages(pageIndex).map((menu, menuIndex) => (
                  <div
                    key={`${pageIndex}-${menuIndex}`}
                    className="flex flex-col gap-2"
                  >
                    <div className="relative w-full aspect-square bg-[#D2D2D2] rounded-[5px] md:rounded-xl overflow-hidden">
                      {menu.images ? (
                        <Image
                          src={menu.images[0]}
                          alt={`메뉴 사진 ${pageIndex * imagesPerPage + menuIndex + 1}`}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        ''
                      )}
                    </div>
                    <div className="aspect-square flex flex-col justify-center">
                      <div className="text-[8px] sm:text-[12px] md:text-[16px] font-medium">
                        {menu.name}
                      </div>
                      <div className="text-[7px] sm:text-[11px] md:text-[14px] mt-1">
                        {menu.price}
                      </div>
                      <div className="text-[#6F6F6F] text-[6px] sm:text-[9px] md:text-[11px] mt-1 line-clamp-2">
                        {menu.description}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="absolute top-1/2 -translate-y-1/2 left-[-19px] md:left-[-50px] z-modal">
          <div
            onClick={() => api?.scrollPrev()}
            className="w-6 md:w-14 h-7 md:h-14 cursor-pointer"
          >
            <IconDirection className="w-full h-full text-[#9F9F9F] rotate-90" />
          </div>
        </div>
        <div className="absolute top-1/2 -translate-y-1/2 right-[-19px] md:right-[-50px] z-modal">
          <div
            onClick={() => api?.scrollNext()}
            className="w-6 md:w-14 h-7 md:h-14 cursor-pointer"
          >
            <IconDirection className="w-full h-full text-[#9F9F9F] -rotate-90" />
          </div>
        </div>
      </Carousel>
    </div>
  </CustomModal>
); 