// require your server and launch it
const server = require('./api/server')
const PORT = 4000

server.listen(PORT, () => {
    console.log(`listening on port ${PORT}`)
})