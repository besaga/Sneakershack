
module.exports = {
    isLoggedIn: (req, res, next) => {
    console.log("entro al middleware", req.session.currentUser)
      req.session.currentUser
        ? next() : res.json({errorMessage: "Has de estar logueado para ver este contenido"});
    }
  };
  
