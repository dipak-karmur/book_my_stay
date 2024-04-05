export const SET_ROLE = "SET_ROLE";
export const REMOVE_ROLE = "REMOVE_ROLE";

export const setRole = (roleType, roleData) => {
    return {
        type: SET_ROLE,
        payload: {
            roleType, roleData
        }
    }
}

export const removeRole = () => {
    return {
        type: REMOVE_ROLE,
    }
}