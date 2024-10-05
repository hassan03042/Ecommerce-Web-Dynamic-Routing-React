import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { Button, Image } from "antd";
import { MinusOutlined, PlusOutlined } from "@ant-design/icons";

function Cart() {
  const { cartItems, removeItemFromCart, addItemToCart, lessQuantityFromCart } = useContext(CartContext);

  const totalAmount = cartItems.reduce(
    (total, obj) => total + obj.quantity * obj.price,
    0
  );

  const totalQuantity = cartItems.reduce(
    (total, obj) => total + obj.quantity,
    0
  );

  return (
    <div className="container mx-auto">
      <h1 className="font-medium text-3xl underline">Cart Items</h1>

      <div className="flex gap-5 my-6">
        <div className="flex-grow flex flex-col border p-4 justify-center items-center rounded-xl">
          <h1>Total Quantity</h1>
          <h1 className="font-semibold font-mono mt-2 text-2xl">{totalQuantity}</h1>
        </div>
        <div className="flex-grow flex flex-col border p-4 justify-center items-center rounded-xl">
          <h1>Total Amount</h1>
          <h1 className="font-semibold font-mono mt-2 text-2xl">$ {Math.round(totalAmount)}</h1>
        </div>
        <div className="flex-grow flex flex-col border p-4 justify-center items-center rounded-xl">
          <h1>Checkout</h1>
        </div>
      </div>

      {cartItems.map((data) => (
        <div key={data.id} className="flex items-center border my-2 p-3 rounded-2xl">
          <Image src={data.thumbnail} height={200} width={250} />

          <div className="flex flex-col pl-5">
            <h1 className="font-medium text-xl mb-2">{data.title}</h1>
            <h1 className="font-medium text-lg mb-2">{data.description}</h1>
            <h1 className="font-semibold text-sm mb-2">${data.price}</h1>

            <div className="flex flex-wrap gap-4 items-center">
              <Button onClick={() => addItemToCart(data)} className="border-none text-black hover:text-black">
                <PlusOutlined className="bg-blue-400 cursor-pointer rounded-full p-1" />
              </Button>

              <h1 className="font-semibold text-xl">{data.quantity}</h1>

              <Button
                className="border-none bg-transparent"
                disabled={data.quantity <= 1}
              >
                <MinusOutlined
                  onClick={() => lessQuantityFromCart(data.id)} // Ensure correct function call
                  className="bg-red-500 cursor-pointer rounded-full p-1"
                />
              </Button>
            </div>

            <Button
              onClick={() => removeItemFromCart(data.id)}
              danger
              className="w-40 my-4"
            >
              Delete
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Cart;
