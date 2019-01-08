const API = 'http://localhost:3001';

// Generate a unique token for storing your data on the backend server.
let token = localStorage.token
if (!token)
  token = localStorage.token = Math.random().toString(36).substr(-8)

const headers = {
  'Accept': 'application/json',
  'Authorization': token
}

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

export const getDetails = id =>
  fetch(`${API}/posts/${id}`, { headers })
    .then(handleErrors)
    .then(res => res.json())

export const getPostComments = id =>
  fetch(`${API}/posts/${id}/comments`, { headers })
    .then(handleErrors)
    .then(res => res.json())

export const postVotePost = (id, vote) =>
  fetch(`${API}/posts/${id}`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ option: vote })
  })
  .then(res => res.json())
  .then(data => data)

export const postVoteComment = (id, vote) =>
  fetch(`${API}/comments/${id}`, {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ option: vote })
  })
  .then(res => res.json())
  .then(data => data)

// Handle HTTP errors since fetch won't.
function handleErrors(response) {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response;
}