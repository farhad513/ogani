/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from "react";
import Carousel from "react-multi-carousel";
import { Link } from "react-router-dom";
import "react-multi-carousel/lib/styles.css";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { FaBangladeshiTakaSign } from "react-icons/fa6";
const Products = ({ title, products }) => {
  // console.log(products)
  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 1,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 1,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };
  // const products = [
  //   [1, 2, 3],
  //   [4, 5, 6],
  // ];
  const ButtonGroup = ({ next, previous }) => {
    return (
      <div className="flex justify-start items-start gap-2">
        <div className="flex justify-center items-center gap-4">
          <div className="text-2xl font-bold">{title}</div>
          <div className="flex justify-center items-center gap-3 text-slate-600">
            <button className="w-[30px] h-[30px] flex justify-center items-center bg-slate-300 border border-slate-200 text-xl">
              <span onClick={() => previous()}>
                <FiChevronLeft />
              </span>
            </button>
            <button className="w-[30px] h-[30px] flex justify-center items-center bg-slate-300 border border-slate-200 text-xl">
              <span onClick={() => next()}>
                <FiChevronRight />
              </span>
            </button>
          </div>
        </div>
      </div>
    );
  };
  return (
    <div className="flex gap-8 flex-col-reverse">
      <Carousel
        autoPlay={true}
        arrows={false}
        infinite={true}
        responsive={responsive}
        transitionDuration={500}
        renderButtonGroupOutside={true}
        customButtonGroup={<ButtonGroup />}
      >
        {products.map((p, i) => {
          return (
            <div className="flex flex-col justify-start gap-2 " key={i}>
              {p.map((p, i) => (
                <Link
                  to={`/product/details/${p.slug}`}
                  key={i}
                  className="flex justify-start items-center gap-3"
                >
                  <img
                    className="w-[110px] h-[110px]"
                    src={p.images[0]}
                    alt={p.name}
                  />
                  <div className="px-3 flex justify-start items-start gap-2 flex-col text-slate-600">
                    <h2>{p?.name.slice(0, 30)}</h2>
                    <span className="text-xl font-bold">
                      <div className="flex justify-center items-center">
                        <FaBangladeshiTakaSign size={16} />
                        {p.price}
                      </div>
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          );
        })}
      </Carousel>
    </div>
  );
};

export default Products;
