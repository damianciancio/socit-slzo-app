export const LOGIN = 'LOGIN';
export const SET_USER_STATUS = 'SET_USER_STATUS';

export const login = user => {
    return async dispatch => {
        const response = await fetch(
            'http://192.168.1.20:3000/api/login',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username: user.username,
                    password: user.password
                })
            }
        );

        const data = await response.json();
        if (response.status == 200) {
            dispatch({ type: LOGIN, user: data.user, token: data.token });
        } else if (response.status == 404) {
            throw new Error("Usuario no encontrado");
        } else if (response.status == 401) {
            throw new Error("La contraseña ingresada es incorrecta");
        }

    }
}

export const fetchUserStatus = () => {
    return async (dispatch, getState) => {
        const { user } = getState();

        if (!user.currentUser) {
            throw { message: 'No current user' }
        }

        const response = await fetch(
            'http://192.168.1.20:3000/api/users/' + user.currentUser.user_id,
            {
                headers: {
                    'Authorization': 'Bearer ' + user.token
                }
            }
        );

        if (response.status == 200) {
            const data = await response.json();
            dispatch({ type: SET_USER_STATUS, user: data });
        }
    }
}