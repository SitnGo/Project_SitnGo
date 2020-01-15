export const SignInAction = (user, bool) =>{
    return {
        type:'SIGN_IN',
        payload: {
            user: user,
            bool: bool,
        },
    };
};
export const signOutAction = (bool) =>{
    return {
        type:'SIGN_OUT',
        payload: bool,
    };
};
export const openSignInAction = () =>{
    return {
        type:'OPEN_OR_CLOSE_SIGN_IN'
    };
};
export const openSignUPAction = () =>{
    return {
        type:'OPEN_OR_CLOSE_SIGN_UP'
    };
};
