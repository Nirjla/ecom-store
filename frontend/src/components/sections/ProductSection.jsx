import React, { useState, useRef } from "react";
import { useGetItemsQuery } from "../../api/apiSlice";
import ProductCard from "../elements/ProductCard";
import NotFoundPage from "../pages/NotFoundPage";
import GridWrapper from "../wrapper/GridWrapper";
import SearchBar from "../elements/SearchBar";

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
                  <SearchBar
                        searchTerm={searchTerm}
                        setSearchTerm={setSearchTerm}
                        handleSearch={handleSearch}
                        handleInputChange={handleInputChange}
                        searchSuggestions={searchSuggestions}
                        handleSelectSuggestion={handleSelectSuggestion}
                  />
                  {isLoading && <p>Loading...</p>}
                  {isError && <NotFoundPage />}
                  {isSuccess && (
                        <GridWrapper>
                              {items.items.map((item) => (
                                    <ProductCard key={item._id} item={item} />

                              ))}
                        </GridWrapper>
                  )}
                  {!searchTerm && isSuccess && (<div className="pagination mt-5 space-x-5">
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
                  )}
            </>
      )
}
