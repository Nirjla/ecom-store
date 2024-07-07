import React, { useState, useRef } from "react";
import { useGetItemsQuery } from "../../api/apiSlice";
import ProductCard from "../elements/ProductCard";
import NotFoundPage from "../pages/NotFoundPage";

export default function ProductSection() {
      const [currentPage, setCurrentPage] = useState(1);
      const [searchTerm, setSearchTerm] = useState('');
      const [searchSuggestions, setSearchSuggestions] = useState([]); // State for search suggestions
      //   const [selectedItem, setSelectedItem] = useState(null);
      const itemsPerPage = 9;
      // const inputRef = useRef(null); // Ref for the search input
      // console.log(inputRef)
      const { data: items, isLoading, isSuccess, isError } = useGetItemsQuery({
            page: currentPage,
            limit: itemsPerPage,
            q: searchTerm  // Pass searchTerm as the query parameter
      });

      const handlePageChange = (newPage) => {
            if (items && newPage >= 1 && newPage <= items.totalPages) {
                  setCurrentPage(newPage);
            }
      };

      const handleSearch = (e) => {
            e.preventDefault();
            setSearchSuggestions([]); // Clear previous search suggestions
            setCurrentPage(1); // Reset to the first page when performing a new search
            // The useGetItemsQuery hook will automatically fetch data with the updated searchTerm
      };

      const handleInputChange = (e) => {
            const value = e.target.value;
            setSearchTerm(value);
            // Simulate search suggestions (replace with actual API call for suggestions)
            if (value.trim() !== '') {
                  const suggestions = items.items.filter(item =>
                        item.name.toLowerCase().includes(value.toLowerCase())
                  );
                  setSearchSuggestions(suggestions);
            } else {
                  setSearchSuggestions([]);
            }
      };

      const handleSelectSuggestion = (item) => {
            //     setSelectedItem(item); // Set the selected item for detailed view
            setSearchTerm(item.name); // Update the search term with the selected suggestion
            setSearchSuggestions([]); // Clear suggestions after selection
      };

      return (
            <>
                  <form onSubmit={handleSearch} className="mb-5">
                        <label htmlFor="default-search" className="sr-only">Search</label>
                        <div className="relative">
                              <input
                                    type="search"
                                    id="default-search"
                                    // ref={inputRef} // Assign ref to the input field
                                    className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="Search ..."
                                    required
                                    value={searchTerm}
                                    onChange={handleInputChange}
                              />
                              <button
                                    type="submit"
                                    className="absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 text-white font-medium rounded-lg text-sm px-4 py-2"
                              >
                                    Search
                              </button>
                        </div>
                        {/* Display search suggestions */}
                        {searchSuggestions?.length > 0 && (
                              <div className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-lg shadow-lg">
                                    {searchSuggestions.map((item) => (
                                          <div
                                                key={item._id}
                                                className="p-2 cursor-pointer hover:bg-gray-100"
                                                onClick={() => handleSelectSuggestion(item)}
                                          >
                                                {item.name}
                                          </div>
                                    ))}
                              </div>
                        )}
                  </form>

                  {isLoading && <p>Loading...</p>}
                  {isError && <NotFoundPage />}
                  {/* {isSuccess && selectedItem && (
        <div className="my-5">
          <h2 className="text-2xl font-semibold mb-3">Selected Item</h2>
          <ProductCard key={selectedItem._id} item={selectedItem} />
        </div>
      )} */}
                  {isSuccess && (
                        <div className="grid grid-cols-4 gap-4">
                              {items.items.map((item) => (
                                    <ProductCard key={item._id} item={item} />

                              ))}
                        </div>
                  )}
                  {searchTerm ? '' :
                        <div className="pagination mt-5 space-x-5">
                              {items && Array.from({ length: items.totalPages }).map((_, index) => (
                                    <button
                                          key={index}
                                          className={`px-3 py-1 rounded ${currentPage === index + 1
                                                ? "bg-gray-400 text-white"
                                                : "bg-gray-300 text-gray-700 hover:bg-gray-400"
                                                }`}
                                          onClick={() => handlePageChange(index + 1)}
                                    >
                                          {index + 1}
                                    </button>
                              ))}
                        </div>
                  }
            </>
      );
}
