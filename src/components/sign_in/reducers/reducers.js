export default function reducers(state={isLoggedInUser:false,willOpenSignIN: false, willOpenSignUP: false},action){
    switch(action.type){
        case 'SIGN_IN__SIGN_OUT':
            return {isLoggedInUser: !state.isLoggedInUser};
                case 'OPEN_OR_CLOSE_SIGN_IN':
                    return {willOpenSignIN: !state.willOpenSignIN};
                    case 'OPEN_OR_CLOSE_SIGN_UP':
                        return {willOpenSignUP: !state.willOpenSignUP};
            default:
                return state;
    }
}