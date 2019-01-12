module.exports = {
  rootPath: '../',

  // HTTP proxy specific requests to a different target.
  httpProxy: {
    context: process.env.NGINX_PROXY_PATH,
    target: process.env.NGINX_PROXY_TARGET_URL,
  },

  // Add polyfills.
  globalImports: ['@babel/polyfill'],

  // Specify where should webpack watch for fixture files (defaults to rootPath).
  watchDirs: ['src'],
};
