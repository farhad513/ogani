import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
const Categorys = () => {
  const { categorys } = useSelector((state) => state.home);
  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 6,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 6,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 4,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 4,
    },
    mdtablet: {
      breakpoint: { max: 768, min: 0 },
      items: 3,
    },
    mobile: {
      breakpoint: { max: 640, min: 0 },
      items: 2,
    },
    xsmobile: {
      breakpoint: { max: 440, min: 0 },
      items: 1,
    },
  };
  return (
    <div className="w-[87%] mx-auto relative">
      <Carousel
        autoPlay={true}
        infinite={true}
        responsive={responsive}
        transitionDuration={500}
      >
        {categorys.map((c, i) => (
          <Link key={i} to="#" className="h-[185px] border block">
            <div className="w-full h-full relative ">
              <img className="w-full h-full relative " src={c.image} alt="" />
              <div className="absolute bottom-6 w-full left-0 font-bold mx-auto flex justify-center items-center">
                <span className="py-[2px] px-6 bg-[#3330305d] text-white text-center">
                  {c.name}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </Carousel>
    </div>
  );
};

export default Categorys;
