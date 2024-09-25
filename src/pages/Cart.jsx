import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { Image } from "antd";

function Cart() {
  const { cartItems } = useContext(CartContext);
  return (
    <div className="container mx-auto">
      <h1 className="font-medium text-3xl underline">Cart Items</h1>
      {cartItems.map((data) => (
        <div key={data.id} className="flex items-center border my-2 p-3">
          <Image src={data.thumbnail} height={100} width={100} />

          <div className="flex flex-col pl-5">
            <h1 className="font-medium text-xl mb-2">{data.title}</h1>
            <h1 className="font-medium text-lg mb-2">{data.description}</h1>
            <h1 className="font-normal text-sm mb-2">{data.category}</h1>
            <h1 className="font-semibold text-sm mb-2">${data.price}</h1>


          </div>
        </div>
      ))}
    </div>
  );
}

export default Cart;
