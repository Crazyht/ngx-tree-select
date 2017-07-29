// const env = 'production';
// const flags = [ 'build', 'prod', 'aot' ];
const env = 'development';
const flags = [];



const webpack = require("webpack");

const isDev = env.indexOf('dev') === 0;

process.env.npm_lifecycle_event = flags.join(':');
process.env.NODE_ENV = env;

const webpackConfig = require(`./config/webpack.${isDev ? 'dev' : 'prod'}`)({env: env});

if (isDev) {
  webpackConfig.plugins.unshift(new webpack.HotModuleReplacementPlugin());
}

function compilerCallback(err, stats) {
  if (err) throw err;
}

const compiler = webpack(webpackConfig); // load webpack

if (isDev) {
  compiler.watch({}, compilerCallback);
} else {
  compiler.run(compilerCallback);
}


