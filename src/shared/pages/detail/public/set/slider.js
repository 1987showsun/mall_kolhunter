export const main = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    className: 'cover-slick-block cover-slick-main'
}

export const sub = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 5,
    className: 'cover-slick-block cover-slick-nav',
    responsive: [
        {
            breakpoint: 1280,
            settings: {
            slidesToShow: 4,
            slidesToScroll: 4
            }
        },
        {
            breakpoint: 860,
            settings: {
            slidesToShow: 3,
            slidesToScroll: 3
            }
        },
        {
            breakpoint: 480,
            settings: {
            slidesToShow: 1,
            slidesToScroll: 1
            }
        }
    ]
}