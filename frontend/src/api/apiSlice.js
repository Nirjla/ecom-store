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
    googleLogin: builder.mutation({
      query: ({ token }) => ({
        url: '/auth/google/callback',
        method: 'POST',
        body: { token }
      })
    }),
    forgotPassword: builder.mutation({
      query: ({ email }) => ({
        url: '/auth/forgot-password',
        method: 'POST',
        body: { email }

      })
    }),
    resetPassword: builder.mutation({
      query: ({ newPassword, token }) => ({
        url: `/auth/reset-password/${token}`,
        method: 'POST',
        body: { newPassword }
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
    }),
    deleteFromCart: builder.mutation({
      query: (itemId) => ({
        url: `/cart/${itemId}`,
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${getTokenFromLocalStorage()}`
        },
      })
    }),
    updateQuantity: builder.mutation({
      query: ({ itemId, quantity }) => ({
        url: `/cart/${itemId}`,
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${getTokenFromLocalStorage()}`
        },
        body: { quantity }
      })
    })
  }),
})

export const { useGetItemsQuery, useGetItemsByIdQuery, useRegisterUserMutation, useLoginUserMutation, useGoogleLoginMutation,
  useForgotPasswordMutation, useResetPasswordMutation,
  useGetCartItemsQuery, useAddToCartMutation, useDeleteFromCartMutation, useUpdateQuantityMutation } = apiSlice
