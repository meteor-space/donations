Package.describe({
  name: 'donations:base',
  version: '0.1.0',
  summary: 'Namespace for the open source solution for managing goods appeals',
  git: 'https://github.com/meteor-space/donations',
  documentation: 'README.md'
});

Package.onUse(function(api) {

  api.versionsFrom('1.2.1');

  api.use([
    'check',
    'space:messaging@2.1.0',
  ], ['client', 'server']);

  api.addFiles([
    'source/namespace.js'
  ], ['client', 'server']);

});
