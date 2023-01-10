const apiUrl = process.env.NODE_ENV === 'development' 
    ? 'http://localhost:3000/api' // development api
    : 'https://next-auth-example-khaki.vercel.app/api'; // production api

export {
    apiUrl
};