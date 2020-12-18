import { types } from "../types/types";



export const authReducer = (state = {}, action) => {

    switch( action.type ){
        case types.login:
            return {
                id: action.payload.id,
                firstName: action.payload.firstName,
                lastName: action.payload.lastName,
                email: action.payload.email,
                username: action.payload.username
            }
        case types.logout:
            return {};
        default:
            return state;
    }
}