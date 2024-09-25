import React, { useContext, useState } from "react";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { Badge } from "antd";
import { Link } from "react-router-dom";
import { CartContext } from "../context/CartContext";

function Header() {
  const {cartItems} = useContext (CartContext)
  console.log("card Context =>", cartItems);
  
  const [search, setSearch] = useState("")

  const filteredArr = cartItems.filter(
    (data) => data.title.toLowerCase().indexOf(search.toLowerCase()) !== -1
  );
  return (
    <div>
      <header className="text-gray-600 body-font fixed z-10 top-0 left-0 w-full">
        <div className="h-16 container mx-auto bg-white flex flex-wrap p-5 py-2 flex-col md:flex-row items-center">
          <a className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              className="w-10 h-10 text-white p-2 bg-orange-400 rounded-full"
              viewBox="0 0 24 24"
            >
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
            </svg>
            <span className="ml-3 text-xl bg-white">Global Store</span>
          </a>
          <nav className="md:ml-auto md:mr-auto flex flex-wrap items-center text-base justify-center">
            <input
              className="input"
              placeholder="Search"
              onChange={(e) => setSearch(e.target.value)}
            />
          </nav>

          <Link to="/cart">
            <Badge count={cartItems.length}>
              <button>
                <ShoppingCartOutlined style={{ fontSize: 24 }} />
              </button>
            </Badge>
          </Link>
        </div>
      </header>
      <div style={{ height: "80px" }}></div>
    </div>
  );
}

export default Header;
