import { useGetCartItemsQuery } from "../../api/apiSlice"

export default function Cart() {
      const { data: items, isSuccess, isLoading, isError } = useGetCartItemsQuery()
      console.log(items)

      return (<>
            {
                  isLoading && <p>Loading...</p>
            }
            {
                  isError && <NotFoundPage />
            }
            {isSuccess && (<>
                  {items.items.map((item, index) => (
                        <div key={index}>
                              <h2>{item.item.name}</h2>
                        </div>
                  ))}
            </>)}
      </>)
}