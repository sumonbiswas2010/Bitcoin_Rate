const app = require('./server')

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log("server up and running on PORT :", port);
});
