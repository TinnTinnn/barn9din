import http from 'http'

http.createServer((req, res) => {

    res.write('hello user')

    res.end()

}).listen(4000, 'localhost')