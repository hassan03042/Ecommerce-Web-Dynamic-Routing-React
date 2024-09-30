import React, { useContext } from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import CategoryChip from "../components/CategoryChip";

function Products() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [chosenCategory, setChosenCategory] = useState("All");
  const [limit, setLimit] = useState(12);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true); // Track if more products are available

  useEffect(() => {
    if (!hasMore) return; // If no more products, do not fetch

    setLoading(true);

    const url =
      chosenCategory === "All"
        ? `https://dummyjson.com/products?limit=${limit}`
        : `https://dummyjson.com/products/category/${chosenCategory}?limit=${limit}`;

    axios
      .get(url)
      .then((res) => {
        const fetchedProducts = res.data.products;
        if (fetchedProducts.length < limit) {
          setHasMore(false); // No more products to load
        }
        setProducts(fetchedProducts);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, [chosenCategory, limit]);

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

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight - 10 && !loading && hasMore
      ) {
        setLimit((prevLimit) => prevLimit + 8);
      }
    };

    window.addEventListener("scroll", handleScroll); // Add scroll listener

    return () => {
      window.removeEventListener("scroll", handleScroll); // Cleanup on unmount
    };
  }, [loading, hasMore]); // Attach the scroll event only once on mount

  return (
    <div className="container mx-auto">
      {products.length === 0 && !loading ? (
        <h1 className="text-center text-3xl mt-44">
          <div className="loader">
            <div className="bar1"></div>
            <div className="bar2"></div>
            <div className="bar3"></div>
            <div className="bar4"></div>
            <div className="bar5"></div>
            <div className="bar6"></div>
            <div className="bar7"></div>
            <div className="bar8"></div>
            <div className="bar9"></div>
          </div>
        </h1>
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
    </div>
  );
}

export default Products;
