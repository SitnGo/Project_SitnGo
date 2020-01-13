export const SignInAction = (user) =>{
    return {
        type:'SIGN_IN',
        payload: user,
    };
};
export const signOutAction = () =>{
    return {
        type:'SIGN_OUT'
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
