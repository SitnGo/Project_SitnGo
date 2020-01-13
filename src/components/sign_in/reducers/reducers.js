export default function reducers(state = {
    user: null,
    isLoggedInUser: false,
    willOpenSignIN: false,
    willOpenSignUP: false,
}, action) {

    switch (action.type) {
        
        case 'SIGN_IN':
            return Object.assign({},state,{
                isLoggedInUser: true,
                user: {
                    ...action.payload,
                },
            })

        case 'SIGN_OUT':
            return Object.assign({},state,{
                isLoggedInUser: false,
                user: null,
            });
        case 'OPEN_OR_CLOSE_SIGN_IN':
            return Object.assign({},state,{ willOpenSignIN: !state.willOpenSignIN });
        case 'OPEN_OR_CLOSE_SIGN_UP':
            return Object.assign({},state,{ willOpenSignUP: !state.willOpenSignUP });
        default:
            return state;
    }
}