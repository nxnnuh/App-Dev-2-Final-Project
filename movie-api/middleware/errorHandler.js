// GLOBAL ERROR HANDLER 
// Catches any errors thrown in routes and sends a generic 500 response.
// Prevents the server from crashing and leaking internal details.
module.exports = (err, req, res, next) => {
  console.error(err.stack);  //Log full error for debugging

  res.status(500).json({
    error: "Something went wrong"
  });
};

