/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import Header from "../components/Header";
import Banner from "../components/Banner";
import Categorys from "../components/Categorys";
import FeatureProduct from "../components/Products/FeatureProduct";
import Products from "../components/Products/Products";
import Footer from "../components/Footer";
import { useSelector, useDispatch } from "react-redux";
import { get_categorys, get_products } from "../store/reducers/homeReducer";
import { FadeLoader } from "react-spinners";
const Home = () => {
  const dispatch = useDispatch();
  const {
    categorys,
    products,
    latestProduct,
    topRatedProduct,
    discountProduct,
    loader,
  } = useSelector((state) => state.home);
  useEffect(() => {
    dispatch(get_products());
  }, []);
  return (
    <div className="w-full">
      <Header />
      <Banner />
      {loader ? (
        <div className="w-screen h-screen flex justify-center items-center fixed top-0 left-0 z-[999] bg-[#30383033]">
          <FadeLoader />
        </div>
      ) : (
        <>
          <div className="my-4">
            <Categorys />
          </div>
          <div className="py-[40px]">
            <FeatureProduct products={products} />
          </div>
          <div className="py-[40px]">
            <div className="w-[85%] flex flex-wrap mx-auto">
              <div className=" w-full grid grid-cols-3 md-lg:grid-cols-2 md:grid-cols-1 gap-7">
                <div className="overflow-hidden">
                  <Products title="Latest Product" products={latestProduct} />
                </div>
                <div className="overflow-hidden">
                  <Products
                    title="Top Rated Product"
                    products={topRatedProduct}
                  />
                </div>
                <div className="overflow-hidden">
                  <Products
                    title="Discount Product"
                    products={discountProduct}
                  />
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      <Footer />
    </div>
  );
};

export default Home;
