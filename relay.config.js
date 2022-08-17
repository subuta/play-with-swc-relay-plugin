// relay.config.js
module.exports = {
  language: 'flow',
  schema: 'src/graphql/schema.graphql',
  src: 'src',
  artifactDirectory: "src/__generated__",
  exclude: ['**/node_modules/**', '**/__mocks__/**', '**/__generated__/**'],
  // SWC only allows ES modules.
  eagerEsModules: true
}
