function event(state = [], action) {
    switch (action.type) {
        case 'EVENT_FETCH_SUCCEEDED':
            return Object.assign({}, {...state},{
               ...action.data
            });
        case 'EVENT_FETCH_FAILED':
            return Object.assign({}, {...state},{
                error:action.message
            });
        case 'EVENT_CREATED':
            return Object.assign({}, {...state},
                {
                    event:action.event
                });
        case 'EVENT_CREATE_FAILED':
            return Object.assign({}, {...state},{
                error:action.message
            });
        default:
            return {...state}
    }
}

export default event;