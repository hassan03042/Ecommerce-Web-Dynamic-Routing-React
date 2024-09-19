import React from "react";
import { ShoppingCartOutlined } from '@ant-design/icons';

function Header() {
  // const [search, setSearch] = useState("")

  // const filteredArr = post.filter(
  //   (data) => data.title.toLowerCase().indexOf(search.toLowerCase()) !== -1
  // );
  return (
    <div>
      <header className="text-gray-600 body-font fixed top-0 left-0 w-full">
        <div className="container mx-auto bg-white flex flex-wrap p-5 flex-col md:flex-row items-center">
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
            <input className="input" placeholder="Search" onChange={(e) => setSearch(e.target.value)}  />

          </nav>
<button>

          <ShoppingCartOutlined style={{ fontSize: 24 }} />
</button>
        </div>
      </header>
      <div style={{ height: '80px' }}></div>
    </div>
  );
}

export default Header;