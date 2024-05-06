const express = require('express')
const app = express()
const port = 5000
const mongodb = require('./db')
const cors = require('cors')

app.use((req,res,next)=>{
  res.setHeader("Access-Control-Allow-Origin","https://food-frontend-sand.vercel.app");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  next();
})

// app.use(cors(
//   {
//     origin: ["https://food-frontend-sand.vercel.app/"],
//     methods: ["POST", "GET"],
//     credentials: true
//   }
// ))

mongodb();

app.get('/', (req, res) => {
  res.send('Hello World!')
})
app.use(express.json())
app.use('/api', require("./Routes/CreateUser"))
app.use('/api', require("./Routes/DisplayData"))
app.use('/api', require("./Routes/OrderData"))

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})