import React from "react"
import { useGetCartItemsQuery } from "../../api/apiSlice"
import CartItem from "../elements/CartItem"

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
                        <React.Fragment key={index}>
                              <CartItem item={item} />
                        </React.Fragment>
                  ))}
            </>)}
      </>)
}