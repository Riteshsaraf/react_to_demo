 function auth(state = [], action) {
    switch (action.type) {
        case 'USER_FETCH_SUCCEEDED':
            console.log(`In Reducer is`,{...state})
            return Object.assign({}, {...state},{
                isLoggedin:true,
                user:action.user,
                accessToken:action.accessToken});
        case 'USER_FETCH_FAILED':
            return Object.assign({}, {...state},{isLoggedin:false,user:null,error:action.message});

        case 'USER_LOGOUT_SUCCEEDED':
            console.log(`In Reducer is`,{...state})
            return Object.assign({}, {...state},{isLoggedin:false,user:null, accessToken:null});
        case 'USER_LOGOUT_FAILED':
            return Object.assign({}, {...state},{error:action.message});
        default:
            return {...state}
    }
}

export default auth;