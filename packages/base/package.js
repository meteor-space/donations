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
    'ecmascript',
    'space:messaging@2.1.0',
    'space:domain@0.1.0',
    'space:vo-user@0.1.0',
    'space:vo-i18n@0.1.0',
    'space:vo-numeral@0.1.0'
  ]);

  // SHARED
  api.addFiles([
    'source/namespace.js'
  ]);

  // SERVER ONLY
  api.addFiles([
    'source/server/value-objects/contact.js',
    'source/server/value-objects/address.js',
    'source/server/events.js',
    'source/server/commands.js',
    'source/server/errors.js'
  ], 'server');

  api.export('Donations');

});
