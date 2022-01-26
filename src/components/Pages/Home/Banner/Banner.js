import React from "react";
import "./Banner.css";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

const Banner = () => {
    const settings = {
        dots: true,
        arrows:false,
        autoplay: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
      };
  return (
    <section className="banner">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2  h-full py-20 ">
          {/* text content */}
          <Slider {...settings}>
          <div className="col-span-2 ">
            <h1 className="title">Feel The</h1>
            <h1 className="title">Freedom To Travel</h1>
            <h1 className="title">with HOLIDAY HYPE</h1>
            <p className="my-10 text-white">
              Travel agents offer advice on destinations, plan trip itineraries,
              and make travel arrangements for clients. Travel agents sell
              transportation, lodging, and admission.
            </p>
            <button className="btn-1 my-5">Our Tours</button>
          </div>
          <div className="col-span-2 ">
            <h1 className="title">Feel The</h1>
            <h1 className="title">Freedom To Travel</h1>
            <h1 className="title">with HOLIDAY HYPE 2</h1>
            <p className="my-10 text-white">
              Travel agents offer advice on destinations, plan trip itineraries,
              and make travel arrangements for clients. Travel agents sell
              transportation, lodging, and admission.
            </p>
            <button className="btn-1 my-5">Our Tours</button>
          </div>
          <div className="col-span-2 ">
            <h1 className="title">Feel The</h1>
            <h1 className="title">Freedom To Travel</h1>
            <h1 className="title">with HOLIDAY HYPE 2</h1>
            <p className="my-10 text-white">
              Travel agents offer advice on destinations, plan trip itineraries,
              and make travel arrangements for clients. Travel agents sell
              transportation, lodging, and admission.
            </p>
            <button className="btn-1 my-5">Our Tours</button>
          </div>
          </Slider>
        </div>
      </div>
    </section>
  );
};

export default Banner;
