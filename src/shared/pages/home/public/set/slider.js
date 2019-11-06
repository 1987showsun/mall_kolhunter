/*
 *   Copyright (c) 2019 
 *   All rights reserved.
 */

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

export const categorySlider = {
    className: "category-wrap",
    centerMode: false,
    infinite: false,
    dots: true,
    centerPadding: "60px",
    slidesToShow: 1,
    speed: 500,
    rows: 2,
    slidesPerRow: 10,
    responsive: [
        {
            breakpoint: 1280,
            settings: {
            centerPadding: "0px",
            slidesPerRow: 10
            }
        },
        {
            breakpoint: 1024,
            settings: {
            centerPadding: "0px",
            slidesPerRow: 8,
            }
        },
        {
            breakpoint: 820,
            settings: {
                centerPadding: "0px",
                slidesPerRow: 7,
            }
            },
        {
            breakpoint: 720,
            settings: {
            centerPadding: "0px",
            slidesPerRow: 6,
            }
        },
        {
            breakpoint: 600,
            settings: {
            centerPadding: "0px",
            slidesPerRow: 4
            }
        },
        {
            breakpoint: 480,
            settings: {
            centerPadding: "0px",
            slidesPerRow: 4
            }
        }
    ]
}