export const ConvertDayNumbertoDayName = (dayNumber) => {
    switch (dayNumber) {
        case 0:
            return "Sunday"
        case 1:
            return "Monday"
        case 2:
            return "Tuesday"
        case 3:
            return "Wednesday"
        case 4:
            return "Thursday"
        case 5:
            return "Friday"
        case 6:
            return "Saturday"
        default:
            return "Good Day"
    }
}



export const didILikeThisBlog = (data) => {
    let liked;

    data.blog.likedOrDislikedUsers.map(user => {
        if (user.username === data.username) {
            liked = user.didYouLikeThis
        }
        return user
    })
    return liked;
}


export const didIDislikeThisBlog = (data) => {
    let disliked;

    data.blog.likedOrDislikedUsers.map(user => {
        if (user.username === data.username) {
            disliked = user.didYouDisLikeThis
        }
        return user
    })
    return disliked;
}

