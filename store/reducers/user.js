import { LOGIN, SET_USER_STATUS } from '../actions/user';

const initialState = {
    currentUser: null,
    token: null
};

export default (state = initialState, action) => {
    switch (action.type) {
        case LOGIN:
            return {
                ...state,
                currentUser: action.user,
                token: action.token
            }
        case SET_USER_STATUS:
            return {
                ...state,
                currentUser: action.user
            }
        default:
            return state;
    }
} 