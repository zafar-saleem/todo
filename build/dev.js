const webpack = require('webpack');
const config = require('./webpack.dev');
const chokidar = require('chokidar');
const webpackDevServer = require('webpack-dev-server');
const port = 2770;

const compiler = webpack(config);
const hotMiddleWare = require('webpack-hot-middleware')(compiler);

chokidar.watch('./*.html').on('all', () => {
    hotMiddleWare.publish({ action: 'reload' });
});

const server = new webpackDevServer(compiler, {
    hot: true,
    contentBase: './',
    quiet: false,
    noinfo: false,
    publicPath: config.output.publicPath,
    stats: { color: true }
});

server.use(hotMiddleWare);

server.listen(port, (err) => {
    if (err) {
        console.log(err);
    } else {
        console.log('Server is running on port: ' + port);
    }
});


