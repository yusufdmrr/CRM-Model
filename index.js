const { app, PORT } = require('./app')

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}...`)
})
