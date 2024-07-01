// Import the RTK Query methods from the React-specific entry point
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_API_URL }),
  prepareHeaders: (headers, { getState }) => {
    const token = getState.auth.token
    if (token) {
      headers.set('authorization', `Bearer ${token}`)
    }
    return headers
  },
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
    })
  }),
})

export const { useGetItemsQuery, useGetItemsByIdQuery, useRegisterUserMutation, useLoginUserMutation } = apiSlice
