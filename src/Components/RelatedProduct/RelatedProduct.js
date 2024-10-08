import axios from "axios";
import React, { useEffect, useState } from "react";
import { baseUrl } from "../../BaseUrl/BaseUrl";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import ProductCard from "../Cards/ProductCard/ProductCard";
import { useLocation } from "react-router-dom";
import AllProductsCard from "../../Pages/AllProducts/AllProductsCard";
import SellerStoreProductsCard from "../../Pages/SellerStore/SellerStoreProductsCard";
import BrandsProductsCard from "../../Pages/Brand/BrandsProductsCard";
import DiscountProductCard from "../../Pages/DiscountProducts/DiscountProductCard";
import BestSellingProductCard from "../../Pages/BestSelling/BestSellingProductCard";
import NewArrivalProductCard from "../../Pages/NewArrival/NewArrivalProductCard";
import TopRatedProductCard from "../../Pages/TopRated/TopRatedProductCard";
import SearchProductCard from "../../Pages/Search/SearchProductCard";
import { useDispatch } from "react-redux";
import { relatedProducts } from "../../Redux/Actions/ProductsAction";

const RelatedProduct = ({ productId , setImg }) => {

  const dispatch = useDispatch()
  let location = useLocation();
  const splitLocation = location?.pathname.split("/");
  const filterSplitLocation = splitLocation[1];

  const [relatedProduct, setRelatedProduct] = useState([]);
  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 7,
      partialVisibilityGutter: 40,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 5,
      partialVisibilityGutter: 40,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 3,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  useEffect(() => {
    axios
      .get(`${baseUrl}/products/related-products/${productId}`)
      .then((res) => {
        setRelatedProduct(res?.data?.data)
        dispatch(relatedProducts(res?.data?.data))
      });
        
  }, [productId, dispatch]);

  
  return (
    <div className="mb-5">
      <h2 className="text-center mt-5 mb-4">Related Products</h2>
      <Carousel
        responsive={responsive}
        swipeable={false}
        draggable={false}
        keyBoardControl={true}
        containerClass="carousel-container"
        removeArrowOnDeviceType={["tablet", "mobile"]}
      >
        {relatedProduct?.map((product) => (
          <div style={{ margin: "0px 10px" }}>
            {filterSplitLocation == "all-products" ? (
              <AllProductsCard key={product?.id} product={product} setImg={setImg}/>
            ) : filterSplitLocation == "sellers-store" ? (
              <SellerStoreProductsCard key={product?.id} product={product} setImg={setImg}/>
            ) : filterSplitLocation == "brand" ? (
              <BrandsProductsCard key={product?.id} product={product} setImg={setImg} />
            ) : filterSplitLocation == "discount-products" ? (
              <DiscountProductCard key={product?.id} product={product} setImg={setImg}/>
            ) : filterSplitLocation == "best-selling" ? (
              <BestSellingProductCard key={product?.id} product={product} setImg={setImg}/>
            ) :  filterSplitLocation == "new-arrival" ? (
              <NewArrivalProductCard key={product?.id} product={product} setImg={setImg}/>
            ) : filterSplitLocation == "top-rated" ? (
              <TopRatedProductCard key={product?.id} product={product} setImg={setImg}/>
            ) : filterSplitLocation == "search" ? (
              <SearchProductCard key={product?.id} product={product} setImg={setImg}/>
            ) : (
              <ProductCard key={product.id} product={product} setImg={setImg} />
            )}
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default RelatedProduct;
