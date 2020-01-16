export default function reducers(state = {
    user: null,
    isLoggedInUser: false,
    willOpenSignIN: false,
    willOpenSignUP: false,
    confirmUpdate : false
}, action) {

    switch (action.type) {
        
        case 'SIGN_IN':
            return Object.assign({},state,{
                isLoggedInUser: action.payload.bool,
                user: {
                    ...action.payload.user,
                },
            })

        case 'SIGN_OUT':
            return Object.assign({},state,{
                isLoggedInUser: action.payload,
                user: null,
            });
        case 'OPEN_OR_CLOSE_SIGN_IN':
            return Object.assign({},state,{ willOpenSignIN: !state.willOpenSignIN });
        case 'OPEN_OR_CLOSE_SIGN_UP':
            return Object.assign({},state,{ willOpenSignUP: !state.willOpenSignUP });
        case 'CONFIRM_DATA_UPDATE':
            return Object.assign({},state,{ confirmUpdate: !state.confirmUpdate });
        default:
            return state;
    }
}