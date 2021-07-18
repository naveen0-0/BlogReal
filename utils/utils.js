const filterAUser = (users, username) => {
   let userTryingtoPerformAnAction = {};
   users.map(user => {
      if (user.username === username) {
         userTryingtoPerformAnAction = user
      }
   })
   return userTryingtoPerformAnAction;
}



module.exports = {
   filterAUser: filterAUser,
}