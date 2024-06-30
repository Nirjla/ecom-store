// Import the RTK Query methods from the React-specific entry point
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_API_URL }),
  endpoints: (builder) => ({
    getItems: builder.query({
      query: ({ page = 1, limit = 9, q = '' } = {}) => ({
        url: `items?page=${1}&limit=${9}`,
        params: { page, limit, q },
      }),
    }),
  }),
})

export const { useGetItemsQuery } = apiSlice
