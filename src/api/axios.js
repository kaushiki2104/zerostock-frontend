import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
});

export default api;

// import axios from 'axios';

// const api = axios.create({
//   baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
//   headers: { 'Content-Type': 'application/json' },
// });

// api.interceptors.response.use(
//   (res) => res,
//   (err) => {
//     const message =
//       err.response?.data?.error ||
//       err.response?.data?.message ||
//       'Something went wrong!';
//     return Promise.reject({ ...err, userMessage: message });
//   }
// );

// export default api;