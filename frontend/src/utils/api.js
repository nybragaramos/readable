const API = 'http://localhost:3001';

// Generate a unique token for storing your data on the backend server.
let token = localStorage.token
if (!token)
  token = localStorage.token = Math.random().toString(36).substr(-8)

const headers = {
  'Accept': 'application/json',
  'Authorization': token
}

/*export const getPosts = () =>
  fetch(`${API}/posts`, { headers })
  	.then(handleErrors)
    .then(res => res.json())
*/
export const getPosts = category => {
  const url = category ? `${API}/${category}/posts` : `${API}/posts`
  return fetch(url, { headers })
    .then(res => res.json())
}

export const getCategories = () =>
  fetch(`${API}/categories`, { headers })
    .then(handleErrors)
    .then(res => res.json())
    .then(data => data.categories)

// Handle HTTP errors since fetch won't.
function handleErrors(response) {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response;
}