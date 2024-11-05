import express from "express"

const app = express()
const port = 8080

app.get('/', (req, res) => {
  res.json({
    message: "API is up and running"
  })
})

app.listen(port, () => {
  console.log(`Server started at port: ${port}`);
})