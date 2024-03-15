import React, { useRef } from 'react';
import { useQuery } from 'react-query';
import axios from 'axios';
import Slider from 'react-slick';

export default function CategorySlider() {

    // const sliderRef = useRef(null);

    // const handleDotClick = (index) => {
    //     if (sliderRef.current) {
    //         sliderRef.current.slickGoTo(index);
    //     }
    // };
    // ref={sliderRef}

    const settings = {
        // dotsClass: 'custom-dots',
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 6,
        slidesToScroll: 1,
        // customPaging: function (i) {
        //     return <div className="custom-dot" onClick={() => handleDotClick(i)}></div>;
        // },
    };

    function getCategories() {
        return axios.get('https://ecommerce.routemisr.com/api/v1/categories');
    }

    const { data } = useQuery('categorySlider', getCategories);

    return (
        <>  <div className='category-slider-container'>
            {data?.data.data ? (
                <div className="py-3">
                    <Slider  {...settings}>
                        {data?.data.data.map((item) => (
                            <img height={250} key={item._id} src={item.image} className="w-100" />
                        ))}
                    </Slider>
                </div>
            ) : ''}
        </div> </>
    );
}
