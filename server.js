
const dotenv = require('dotenv');
const path = require('path')

console.log({nodeENV: process.env.NODE_ENV})
dotenv.config({
	path: path.resolve(__dirname, `${process.env.NODE_ENV}.env`)
})


console.log({env: process.env})
console.log({nodeENV: process.env.NODE_ENV})
const PORT = process.env.PORT;
const express = require("express")
const webpack = require("webpack");
const middleware = require("webpack-dev-middleware");
const config = require('./webpack.config')({...process.env})
const compiler = webpack({
    // webpack options
    ...config
});

let app = express()
// app.get('/', (req, res) => res.send("HELLO FROM EXPRESS"));
// app.use(express.static('public'))
app.use(require('webpack-dev-middleware')(compiler, {
    // noInfo: true,
    publicPath: config.output.publicPath,
    writeToDisk: true
}));

app.get('*', function (request, response,next) {
    console.log({'callingAPI': true, path: compiler.outputPath})
    var filename = path.join(compiler.outputPath, 'index.html');
    compiler.outputFileSystem.readFile(filename, function (err, result) {
        if (err) {
            console.log({err})
            return next(err);
        }
        response.set('content-type', 'text/html');
        response.send(result);
        response.end();
    });
});

app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`));