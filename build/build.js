const webpack = require('webpack');
const ora = require('ora');
const config = require('./webpack.prod.js');
require('shelljs/global');

const spinner = ora('processing...');

spinner.start();

rm('-rf', 'dist');

webpack(config, (err, stats) => {
    spinner.stop();

    if (err) throw err;

    process.stdout.write(stats.toString({
        colors: true,
        modules: false,
        children: false,
        chunks: false,
        chunkModules: false
    }) + '\n');
});


