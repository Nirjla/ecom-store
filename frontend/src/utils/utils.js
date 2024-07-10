import clsx from "clsx";
import { jwtDecode } from "jwt-decode";
import { twMerge } from "tailwind-merge";

export const getTokenFromLocalStorage = () => {
      return localStorage.getItem('token')
}
export const setTokenInLocalStorage = (token) => {
      localStorage.setItem('token', token);
};


export const removeTokenFromLocalStorage = () => {
      return localStorage.removeItem('token')
}

export const decodeToken = (token) => {
      try {
            return jwtDecode(token)
      } catch (err) {
            return null
      }
}

export const isTokenExpired = (decodedToken, currentTime) => {
      if (!decodedToken || !decodedToken.exp) {
            return true; // Token is considered expired if no expiration or invalid decoded token
      }
      return decodedToken.exp < currentTime;
}


export function cn(...inputs) {
      return twMerge(clsx(inputs))
}