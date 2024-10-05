import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "../components/ProductCard";
import CategoryChip from "../components/CategoryChip";
import { Pagination } from "antd";

function Products() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [chosenCategory, setChosenCategory] = useState("All");
  const [limit, setLimit] = useState(12);
  const [skip, setSkip] = useState(0);
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);

      const url =
        chosenCategory === "All"
          ? `https://dummyjson.com/products?limit=${limit}&skip=${skip}`
          : `https://dummyjson.com/products/category/${chosenCategory}?limit=${limit}&skip=${skip}`;

      try {
        const res = await axios.get(url);
        const fetchedProducts = res.data.products;

        setProducts(fetchedProducts);
        setTotal(res.data.total);
        setLoading(false);
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    };

    fetchProducts();
  }, [chosenCategory, limit, skip]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get("https://dummyjson.com/products/categories");
        setCategories(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div className="container mx-auto">
      {products.length === 0 && !loading ? (
        <h1 className="text-center text-3xl mt-44">No products found</h1>
      ) : (
        <div>
          <div className="flex gap-3 flex-wrap mb-4">
            <CategoryChip
              onClick={() => {
                setChosenCategory("All");
                setSkip(0); 
              }}
              isChosen={chosenCategory === "All"}
              category={{ slug: "All", name: "All" }}
            />
            {categories.map((category) => (
              <CategoryChip
                onClick={() => {
                  setChosenCategory(category.slug);
                  setSkip(0); 
                }}
                isChosen={category.slug === chosenCategory}
                category={category}
                key={category.slug}
              />
            ))}
          </div>
          {loading ? (
            <div className="flex justify-center items-center">
              <div className="dot-spinner">
                <div className="dot-spinner__dot" />
                <div className="dot-spinner__dot" />
                <div className="dot-spinner__dot" />
                <div className="dot-spinner__dot" />
                <div className="dot-spinner__dot" />
                <div className="dot-spinner__dot" />
                <div className="dot-spinner__dot" />
                <div className="dot-spinner__dot" />
              </div>
            </div>
          ) : null}
          <div className="flex flex-wrap -m-4 my-4">
            {products.map((item) => (
              <ProductCard item={item} key={item.id} />
            ))}
          </div>
        </div>
      )}

      <Pagination
        onChange={(num) => {
          setSkip((num - 1) * limit);
        }}
        onShowSizeChange={(page, pageSize)=> setLimit(pageSize)}
        defaultCurrent={1}
        total={total}
        pageSize={limit}
      />
    </div>
  );
}

export default Products;
