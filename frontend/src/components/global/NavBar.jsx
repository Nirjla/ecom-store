import { Link } from "react-router-dom";

export default function NavBar() {
      return (<>
            <header className="bg-white border-b">
                  <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between items-center py-4">
                              <div className="header-logo">
                                    <Link to="/">
                                          <h1 className="font-semibold text-lg md:text-xl  lg:text-2xl text-nowrap space-x-2 text-secondary ">
                                                Sys
                                                <span className="text-primary">Qube</span>
                                                <span>Store</span>
                                          </h1>
                                    </Link>
                              </div>
                              <div className="hidden md:flex md:items-center md:space-x-6">
                                    <ul className="flex items-center space-x-6 text-secondary">
                                          <li>
                                                <Link
                                                      to="/"
                                                      className="leading-[60px] capitalize font-medium"
                                                >
                                                      Home
                                                </Link>
                                          </li>
                                          <li>
                                                <Link
                                                      to="/products"
                                                      className="leading-[60px] capitalize font-medium"
                                                >
                                                      Products
                                                </Link>
                                          </li>
                                          <li>
                                                <Link
                                                      to="/contact"
                                                      className="leading-[60px] capitalize font-medium"
                                                >
                                                      Contact Us
                                                </Link>
                                          </li>
                                    </ul>
                              </div>
                        </div>
                  </nav>
            </header>
      </>)
}