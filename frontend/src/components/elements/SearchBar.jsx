import React from "react";

const SearchBar = ({ searchTerm, setSearchTerm, handleSearch, handleInputChange, searchSuggestions, handleSelectSuggestion }) => {
    return (
        <form onSubmit={handleSearch} className="mb-5">
            <label htmlFor="default-search" className="sr-only">Search</label>
            <div className="relative">
                <input
                    type="search"
                    id="default-search"
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
    );
};

export default SearchBar;
