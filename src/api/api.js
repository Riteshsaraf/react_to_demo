import axios from "axios";

const baseURL = process.env.NODE_ENV==='production' ?  'Enter your production url HERE': 'http://localhost:3001';
export const API = ()=>{
    const api=  axios.create({
        baseURL,
        timeout: 1000,
        headers: {'X-Custom-Header': 'foobar'}
    })

    // Important: If axios is used with multiple domains, the AUTH_TOKEN will be sent to all of them.
    // See below for an example using Custom instance defaults instead.
    api.defaults.headers.post['Content-Type'] = 'application/json';
    api.defaults.timeout = 10000;

    localStorage.setItem('appState', 'serialState');

    // Add a request interceptor
    api.interceptors.request.use(function (config) {
        // Do something before request is sent
        config.headers.common['Authorization'] = `Basic ${localStorage.getItem('accessToken')}`
        return config;
    }, function (error) {
        // Do something with request error
        return Promise.reject(error);
    });

// Add a response interceptor
    api.interceptors.response.use(function (response) {
        // Any status code that lie within the range of 2xx cause this function to trigger
        // Do something with response data

        console.log({apiResponse: response})

        if(response?.data?.success && response?.data.accessToken){
            localStorage.setItem('accessToken', response?.data.accessToken)
        }

        return response;
    }, function (error) {
        // Any status codes that falls outside the range of 2xx cause this function to trigger
        // Do something with response error
        return Promise.reject(error);
    });



    const login = (payload)=>{
        console.log(`login api called with a payload`, payload)
        return api.post('auth/signin',payload)
    }

    const logout = (payload)=>{
        console.log(`logout api called with a payload`, payload)
        return api.get('auth/logout')
    }
    return {
        api,
        login,
        logout
    }
}



