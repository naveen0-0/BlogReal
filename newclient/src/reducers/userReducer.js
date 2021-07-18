export const userReducer = (state = { username: "", email: "", loggedIn: false }, action) => {
    switch (action.type) {
        case "UPDATEUSER":
            return {
                username: action.payload.username,
                email: action.payload.email,
                loggedIn: action.payload.loggedIn
            }
        default:
            return state;
    }
}



