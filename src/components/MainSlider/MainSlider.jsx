import React from 'react'
import Slider from 'react-slick';
import img1 from '../../assets/images/slider_1.jpeg'
import img2 from '../../assets/images/slider_2.jpeg'
import img3 from '../../assets/images/slider_3.jpeg'
import img4 from '../../assets/images/slider_4.jpeg'
import img5 from '../../assets/images/slider_5.jpeg'
export default function MainSlider() {

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
    };

    return (
        <>
            <div className="container">
                <div className="row gx-0 d-flex justify-content-center align-items-center my-4">
                    <div className="col-md-3">
                        <Slider  {...settings}>
                            <img height={450} className='w-100' src={img1} alt="" />
                            <img height={450} className='w-100' src={img2} alt="" />
                            <img height={450} className='w-100' src={img3} alt="" />
                        </Slider>
                    </div>
                    <div className="col-md-3">
                        <img height={250} className='d-block w-100' src={img4} alt="" />
                        <img height={250} className='w-100' src={img5} alt="" />

                    </div>
                </div>
            </div>

        </>
    )
}
