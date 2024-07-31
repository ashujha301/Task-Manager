const initialState = {
    isAuthenticated: false,
    userId: null,
    username: null,
    token: null,
};

const authReducer = (state = initialState , action) => {
    switch(action.type){
        case 'LOGIN_SUCCESS': 
            return {
                ...state,
                isAuthenticated: true,
                userId:action.payload.userId,
                username: action.payload.username,
                token: action.payload.token,
            };
        case 'LOGOUT':
            return {
                ...state,
                isAuthenticated: false,
                userId:null,
                username: null,
                token: null,
            };
        default:
            return state;
}
};

export default authReducer;
