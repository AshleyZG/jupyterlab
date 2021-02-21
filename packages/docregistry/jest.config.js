const func = require('@jupyterlab/testutils/lib/jest-config');

// @todo: remove this code
// Jest doesn't handle the lib0 dependency which is required for the rtc server.
// We will move the code that depends on lib0 to another package.
// For now, adding lib0 to the ignore pattern fixes the problem.
// There is no need to add it to the testutils package because that would just complicate things..
const conf = func(__dirname);
conf.transformIgnorePatterns = (conf.transformIgnorePatterns || []).concat([
  "/node_modules/(?![lib0]).+\\.js$",
  "/node_modules/(?![lib0]).+\\.cjs$",
]);

module.exports = conf;
