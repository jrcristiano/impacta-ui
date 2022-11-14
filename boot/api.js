import axios from 'axios';
const baseUrl = 'http://localhost:5000/';

axios.interceptors.request.use(function (config) {
  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxMCwibmFtZSI6IkNyaXN0aWFubyIsImxhc3RuYW1lIjoiSnVuaW9yIiwiZW1haWwiOiJjcmlzdGlhbm8uanVuaW9yQHNlcnZlci5jb20iLCJjcmVhdGVkX2F0IjoiMjAyMi0xMC0xOVQxNzoyMzo1OC4wMDBaIiwidXBkYXRlZF9hdCI6IjIwMjItMTAtMjBUMTk6MDk6NTMuMDAwWiJ9LCJpYXQiOjE2NjcwNzE5ODgsImV4cCI6MTY5ODYwNzk4OH0.mLEZRlnf01FSQlrDLsWcha24PBLWybaX8QlaIis3nt4';

  config.headers.Authorization = token;
  config.baseURL = baseUrl;
  return config;
});

export default axios;
