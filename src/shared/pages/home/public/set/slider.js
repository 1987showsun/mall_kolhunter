export const storeSlider = {
    className: "slider-nromal store-card",
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 6,
    initialSlide: 0,
    responsive: [
        {
            breakpoint: 1280,
            settings: {
                slidesToShow: 5,
                slidesToScroll: 5
            }
        },
            {
            breakpoint: 1024,
            settings: {
                slidesToShow: 4,
                slidesToScroll: 4
            }
        },
        {
            breakpoint: 720,
            settings: {
                arrows: false,
                slidesToShow: 3.2,
                slidesToScroll: 3
            }
        },
        {
            breakpoint: 600,
            settings: {
                arrows: false,
                slidesToShow: 2.2,
                slidesToScroll: 2
            }
        }
    ]
}