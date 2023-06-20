import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Header = ({ toggleMiniCart }) => {
  const user = useSelector((state) => state.user.user);

  return (
    <header className="grid max-w-laptop grid-rows-2 left-1/2 -translate-x-1/2 grid-columns-1 absolute w-full place-items-center h-24 md:grid-cols-3 md:grid md:grid-rows-1">
      <div className="hidden md:block"></div>
      <nav className="flex justify-evenly w-full max-w-md mt-3 md:mt-0 font-medium">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
        </ul>
        <ul>
          <li>
            <Link to="/shop">Shop</Link>
          </li>
        </ul>
        <ul>
          <li>
            <Link to="/blog">About</Link>
          </li>
        </ul>
        <ul>
          <li>
            <Link to="/contacts">Contact</Link>
          </li>
          <li>
            <Link to="/add-product">Add Product</Link>
          </li>
        </ul>
      </nav>
      <div className="w-2/4 h-7 mb-2 md:mb-0">
        <ul className="flex h-7 justify-around w-full">
          <li className="h-7">
            {user ? (
              user?.avatar ? (
                <Link to="/profile">
                  <img
                    src={user.avatar}
                    alt="avatar"
                    className="rounded-full w-7 h-7"
                  />
                </Link>
              ) : (
                <Link to="/profile">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="28"
                    height="28"
                    viewBox="0 0 24 24"
                  >
                    <g
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                    >
                      <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10s10-4.477 10-10S17.523 2 12 2Z" />
                      <path d="M4.271 18.346S6.5 15.5 12 15.5s7.73 2.846 7.73 2.846M12 12a3 3 0 1 0 0-6a3 3 0 0 0 0 6Z" />
                    </g>
                  </svg>
                </Link>
              )
            ) : (
              <Link to="/auth">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="28"
                  height="28"
                  viewBox="0 0 24 24"
                >
                  <g
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                  >
                    <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10s10-4.477 10-10S17.523 2 12 2Z" />
                    <path d="M4.271 18.346S6.5 15.5 12 15.5s7.73 2.846 7.73 2.846M12 12a3 3 0 1 0 0-6a3 3 0 0 0 0 6Z" />
                  </g>
                </svg>
              </Link>
            )}
          </li>
          <li>
            <button>
              <svg
                width="28"
                height="28"
                viewBox="0 0 28 28"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M24.5 24.5L19.2663 19.257M22.1667 12.25C22.1667 14.8801 21.1219 17.4024 19.2622 19.2622C17.4024 21.1219 14.8801 22.1667 12.25 22.1667C9.61995 22.1667 7.0976 21.1219 5.23787 19.2622C3.37813 17.4024 2.33334 14.8801 2.33334 12.25C2.33334 9.61995 3.37813 7.0976 5.23787 5.23787C7.0976 3.37813 9.61995 2.33334 12.25 2.33334C14.8801 2.33334 17.4024 3.37813 19.2622 5.23787C21.1219 7.0976 22.1667 9.61995 22.1667 12.25V12.25Z"
                  stroke="black"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          </li>
          <li>
            <Link to="/liked">
              <svg
                width="28"
                height="28"
                viewBox="0 0 28 28"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M8.16665 3.5C4.94548 3.5 2.33331 6.08533 2.33331 9.275C2.33331 11.8498 3.35415 17.9608 13.4026 24.1383C13.5826 24.2479 13.7893 24.3058 14 24.3058C14.2107 24.3058 14.4173 24.2479 14.5973 24.1383C24.6458 17.9608 25.6666 11.8498 25.6666 9.275C25.6666 6.08533 23.0545 3.5 19.8333 3.5C16.6121 3.5 14 7 14 7C14 7 11.3878 3.5 8.16665 3.5Z"
                  stroke="black"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>
          </li>
          <li>
            <button type="button" onClick={toggleMiniCart}>
              <svg
                width="28"
                height="28"
                viewBox="0 0 28 28"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M25.2356 19.1926H8.95237L9.76995 17.5273L23.3543 17.5027C23.8137 17.5027 24.2074 17.1746 24.2895 16.7207L26.1707 6.19063C26.2199 5.91445 26.1461 5.63008 25.9656 5.41406C25.8765 5.30775 25.7652 5.22211 25.6396 5.16309C25.514 5.10407 25.3771 5.07308 25.2383 5.07227L7.95706 5.01484L7.8094 4.32031C7.71643 3.87734 7.31721 3.55469 6.86331 3.55469H2.6387C2.3827 3.55469 2.13719 3.65638 1.95617 3.8374C1.77516 4.01841 1.67346 4.26393 1.67346 4.51992C1.67346 4.77592 1.77516 5.02143 1.95617 5.20245C2.13719 5.38346 2.3827 5.48516 2.6387 5.48516H6.08127L6.72659 8.55313L8.31526 16.2449L6.26995 19.5836C6.16373 19.727 6.09975 19.8972 6.08526 20.075C6.07076 20.2528 6.10632 20.4312 6.18791 20.5898C6.35198 20.9152 6.68284 21.1203 7.04924 21.1203H8.76643C8.40035 21.6065 8.20261 22.1988 8.20315 22.8074C8.20315 24.3551 9.46096 25.6129 11.0086 25.6129C12.5563 25.6129 13.8141 24.3551 13.8141 22.8074C13.8141 22.1977 13.6117 21.6043 13.2508 21.1203H17.6559C17.2898 21.6065 17.0921 22.1988 17.0926 22.8074C17.0926 24.3551 18.3504 25.6129 19.8981 25.6129C21.4457 25.6129 22.7035 24.3551 22.7035 22.8074C22.7035 22.1977 22.5012 21.6043 22.1403 21.1203H25.2383C25.7688 21.1203 26.2035 20.6883 26.2035 20.1551C26.2019 19.8994 26.0993 19.6546 25.9179 19.4743C25.7366 19.294 25.4913 19.1927 25.2356 19.1926V19.1926ZM8.35901 6.91797L24.1035 6.96992L22.5614 15.6051L10.1938 15.627L8.35901 6.91797ZM11.0086 23.6715C10.5328 23.6715 10.1446 23.2832 10.1446 22.8074C10.1446 22.3316 10.5328 21.9434 11.0086 21.9434C11.4844 21.9434 11.8727 22.3316 11.8727 22.8074C11.8727 23.0366 11.7816 23.2564 11.6196 23.4184C11.4576 23.5805 11.2378 23.6715 11.0086 23.6715V23.6715ZM19.8981 23.6715C19.4223 23.6715 19.034 23.2832 19.034 22.8074C19.034 22.3316 19.4223 21.9434 19.8981 21.9434C20.3739 21.9434 20.7621 22.3316 20.7621 22.8074C20.7621 23.0366 20.6711 23.2564 20.5091 23.4184C20.347 23.5805 20.1272 23.6715 19.8981 23.6715V23.6715Z"
                  fill="black"
                />
              </svg>
            </button>
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Header;
