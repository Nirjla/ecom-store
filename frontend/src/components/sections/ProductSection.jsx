import { useState } from "react";
import { useGetItemsQuery } from "../../api/apiSlice";
import ProductCard from "../elements/ProductCard";
import NotFoundPage from "../pages/NotFoundPage";

export default function ProductSection() {
      const [page, setPage] = useState(1)
      const itemsPerPage = 9;
      // const [limit, setLimit] = useState(10)
      // const [query, setQuery] = useState('')
      const { data: items, isLoading, isSuccess, isError, } = useGetItemsQuery()
      // console.log(data)
      return (<>
            {
                  isLoading && <p>Loading...</p>
            }
            {
                  isError && <NotFoundPage />
            }
            {isSuccess && (
                  <>
                        {
                              items.items.map(item => (

                                    <ProductCard key={item._id} item={item} />
                              ))
                        }
                        <button className="rounded-full bg-gray-400" onClick={() => setPage(page - 1)} disabled={page === 1}>Previous</button>
                        <button className="rounded-full bg-gray-400" onClick={() => setPage(page + 1)} disabled={page === items.totalPages}>Next</button>
                  </>
            )}
      </>)
}