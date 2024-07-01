import { useParams } from "react-router-dom"
import { useGetItemsByIdQuery } from "../../api/apiSlice"
import NotFoundPage from "./NotFoundPage"

export default function ProductDetails() {
      const { id } = useParams()
      const { data: item, isLoading, isSuccess, isError } = useGetItemsByIdQuery(id)
      if (isLoading) {
            return <p>Loading....</p>
      }
      if (isError) {
            return <NotFoundPage />
      }
      if (isSuccess) {
            return (<>
                  <div>
                        <h2>{item.name}</h2>
                        <p>{item.description}</p>
                  </div>
            </>)

      }
}