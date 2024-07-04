import {jwtDecode} from "jwt-decode";

export const getTokenFromLocalStorage = () => {
      return localStorage.getItem('token')
}


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
        return decodedToken.exp < currentTime;}