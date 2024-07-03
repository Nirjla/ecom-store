import { useState } from "react";
import { useGetItemsQuery } from "../../api/apiSlice";
import ProductCard from "../elements/ProductCard";
import NotFoundPage from "../pages/NotFoundPage";

export default function ProductSection() {
      const [currentPage, setCurrentPage] = useState(1)
      const itemsPerPage = 9;
      // const [limit, setLimit] = useState(10)
      // const [query, setQuery] = useState('')
      const { data: items, isLoading, isSuccess, isError, } = useGetItemsQuery({ page: currentPage, limit: itemsPerPage })
      // console.log(data)
      const handlePageChange = (newPage) => {
            if (newPage >= 1 && newPage <= items.totalPages) {
                  setCurrentPage(newPage)
            }
      }
      return (<>
            {
                  isLoading && <p>Loading...</p>
            }
            {
                  isError && <NotFoundPage />
            }
            {isSuccess && (
                  <>
                        <div className="my-5 grid grid-cols-4 gap-4">
                              {
                                    items.items.map(item => (

                                          <ProductCard key={item._id} item={item} />
                                    ))
                              }
                        </div>
                        <div className="pagination space-x-5">
                              {Array.from({ length: items.totalPages }).map((_, index) => (
                                    <>
                                          <button className={` 
                                          ${currentPage === index + 1 ? 'bg-gray-400' : 'bg-gray-300'}
                                          `}
                                                key={index}
                                                onClick={() => handlePageChange(index + 1)}
                                          >{index + 1}</button>
                                    </>

                              ))}
                        </div>
                  </>
            )}
      </>)
}