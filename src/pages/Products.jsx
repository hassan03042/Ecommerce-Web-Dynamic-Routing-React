import React from 'react';
import axios from "axios";
import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import CategoryChip from "../components/CategoryChip";

function Products() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [chosenCategory, setChosenCategory] = useState("All");

  useEffect(() => {
    console.log("Use effect Call Hogya");
    const url =
      chosenCategory === "All"
        ? "https://dummyjson.com/products"
        : `https://dummyjson.com/products/category/${chosenCategory}`;
    axios
      .get(url)
      .then((res) => {
        setProducts(res.data.products);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [chosenCategory]);

  useEffect(() => {
    axios
      .get("https://dummyjson.com/products/categories")
      .then((res) => {
        setCategories(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="container mx-auto">
      {products.length === 0 ? (
        <h1 className="text-center text-3xl"> 
        <div class="loader">
                       <div class="bar1"></div>
                       <div class="bar2"></div>
                       <div class="bar3"></div>
                       <div class="bar4"></div>
                       <div class="bar5"></div>
                       <div class="bar6"></div>
                       <div class="bar7"></div>
                       <div class="bar8"></div>
                       <div class="bar9"></div>
                   </div></h1>
      ) : (
        <div>
          <div className="flex gap-3 flex-wrap">
            <CategoryChip
              onClick={() => setChosenCategory("All")}
              isChosen={chosenCategory === "All"}
              category={{
                slug: "All",
                name: "All",
              }}
            />
            {categories.map((category) => (
              <CategoryChip
                onClick={() => setChosenCategory(category.slug)}
                isChosen={category.slug === chosenCategory}
                category={category}
                key={category.slug}
              />
            ))}
          </div>

          <div className="flex flex-wrap -m-4 my-4">
            {products.map((item) => (
              <ProductCard item={item} key={item.id} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Products;