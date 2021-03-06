'use strict';
const serveStatic = require('serve-static');
const getPaths = require('./lib/getPaths');
const getSiteMetadata = require('./lib/getSiteMetadata');
const getWebpackVendorConfig = require('./lib/getWebpackVendorConfig');
const getWebpackClientConfig = require('./lib/getWebpackClientConfig');
const getWebpackBuildConfig = require('./lib/getWebpackBuildConfig');

module.exports = options => {
  const root = options.root;
  const debug = options.debug;
  const optimize = false;
  const manifest = [];

  const paths = getPaths(root);
  
  return getSiteMetadata(root)
    .then(metadata => {
      return {
        debug,
        webpack: {
          vendor: getWebpackVendorConfig({root, optimize, manifest}),
          client: getWebpackClientConfig({root, optimize, metadata, manifest}),
          build: getWebpackBuildConfig({root, optimize, metadata, manifest})
        },
        onServerStart: server => {console.log(paths.dest); server.use(serveStatic(paths.dest))}
      };
    })
  ;

};
