import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AiFillDollarCircle } from "react-icons/ai";
import { BsCart4, BsCartX } from "react-icons/bs";
import { BiCategory } from "react-icons/bi";
import InfoBox from "../../infoBox/InfoBox";
import { CALC_STORE_VALUE } from "../../../redux/features/product/productSlice";
import "./ProductSummary.scss";

// Icons
const earningIcon = <AiFillDollarCircle size={40} color="#fff" />;
const productIcon = <BsCart4 size={40} color="#fff" />;
const categoryIcon = <BiCategory size={40} color="#fff" />;
const outOfStockIcon = <BsCartX size={40} color="#fff" />;

// Format Amount
export const formatNumbers = (x) => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};
const ProductSummary = ({ products }) => {
  const { totalStoreValue } = useSelector((state) => state.product);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(CALC_STORE_VALUE(products));
  }, [dispatch, products]);
  return (
    <div className="product-summary">
      <h3 className="--mt">Inventory Stats</h3>
      <div className="info-summary">
        <InfoBox
          icon={productIcon}
          title={"Total Products"}
          count={products.length}
          bgColor="card1"
        />
        <InfoBox
          icon={earningIcon}
          title={"Total Store Value"}
          count={`$${formatNumbers(totalStoreValue.toFixed(2))}`}
          bgColor="card2"
        />
        <InfoBox
          icon={outOfStockIcon}
          title={"Out of Stock"}
          count={"0"}
          bgColor="card3"
        />
        <InfoBox
          icon={categoryIcon}
          title={"All Categories"}
          count={"0"}
          bgColor="card4"
        />
      </div>
    </div>
  );
};

export default ProductSummary;
