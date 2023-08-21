import axios from 'axios';
export function storeTokenInLocalStorage(token) {
  localStorage.setItem('token', token);
}

export function selfExpireTokenInLocalStorage() {
  localStorage.setItem('token', "1");
}

export function getTokenFromLocalStorage() {
  return localStorage.getItem('token');
}

export async function getAuthenticatedUser() {
  const defaultReturnObject = { authenticated: false, user: null };
  try {
    const token = getTokenFromLocalStorage();
    if (!token) {
      return defaultReturnObject;
    }
    const response = await axios({
      method: 'GET',
      url: "http://localhost:3000/auth/me",
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    const { authenticated = false } = response.data;
    return authenticated ? response.data : false;
  }
  catch (err) {
    console.log('getAuthenticatedUser, Something Went Wrong', err);
    return defaultReturnObject;
  }
}