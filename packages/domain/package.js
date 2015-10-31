Package.describe({
  name: 'donations:domain',
  version: '0.1.0',
  summary: 'Domain Bounded context for the open source solution for managing goods appeals',
  git: 'https://github.com/meteor-space/donations',
  documentation: 'README.md'
});

Package.onUse(function(api) {

  api.versionsFrom('1.2.1');

  api.use([
    'mongo',
    'check',
    'space:event-sourcing@2.1.0',
    'donations:base'
  ]);

  // MODULES
  api.addFiles(['source/client/module.js'], 'client');
  api.addFiles(['source/server/module.js'], 'server');

  // SHARED
  api.addFiles([
    'source/shared/commands.js',
  ]);

  // SERVER only
  api.addFiles([

  ], 'server');

});


Package.onTest(function(api) {

  api.use([
    'mongo',
    'donations:domain',
    'practicalmeteor:munit@2.1.5',
    'space:testing@2.0.0',
  ]);

});
