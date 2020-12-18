import { types } from "../js/types/types"

export const login = (id, firstName, lastName, email, username) => ({
    type: types.login,
    payload: {
        id,
        firstName,
        lastName,
        email,
        username
    }
});

export const logout = () => ({
    type: types.logout
})
