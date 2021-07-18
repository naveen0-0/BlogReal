


let InitialValue = {
   likes: 0,
   dislikes: 0,
   didILikeThis: false,
   didIDislikeThis: false
}

export const likeReducer = (state = InitialValue, action) => {
   switch (action.type) {

      case "UPDATELIKESANDDISLIKES":
         return {
            likes: action.payload.likes,
            dislikes: action.payload.dislikes,
            didILikeThis: action.payload.didILikeThis,
            didIDislikeThis: action.payload.didIDislikeThis
         };

      default:
         return state;
   }
}



