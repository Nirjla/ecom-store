// Import the RTK Query methods from the React-specific entry point
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { getTokenFromLocalStorage } from '../utils/utils'
export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_API_URL }),
  endpoints: (builder) => ({
    registerUser: builder.mutation({
      query: (user) =>
      ({
        url: '/auth/register',
        method: 'POST',
        body: user
      })
    }),
    loginUser: builder.mutation({
      query: (user) => ({
        url: '/auth/login',
        method: "POST",
        body: user
      })
    }),
    getItems: builder.query({
      query: ({ page = 1, limit, q = '' } = {}) => ({
        url: 'items',
        params: { page, limit, q },
      }),
    }),
    getItemsById: builder.query({
      query: (id) => ({
        url: `items/${id}`
      })
    }),
    getCartItems: builder.query({
      query: () => ({
        url: '/cart',
        headers: {
          Authorization: `Bearer ${getTokenFromLocalStorage()}`
        },
      })
    }),
    addToCart: builder.mutation({
      query: (item) => ({
        url: '/cart',
        method: 'POST',
        headers: {
          Authorization: `Bearer ${getTokenFromLocalStorage()}`
        },
        body: item
      })
    })

  }),
})

export const { useGetItemsQuery, useGetItemsByIdQuery, useRegisterUserMutation, useLoginUserMutation, useGetCartItemsQuery, useAddToCartMutation } = apiSlice
