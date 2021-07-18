const IntialValue = []


export const CommentsReducer = (state = IntialValue, action) => {
    switch (action.type) {
        case "UPDATECOMMENTS":
            return action.payload;

        case "ADDCOMMENT":
            return [
                action.payload, ...state
            ]
        default:
            return state;
    }
}



