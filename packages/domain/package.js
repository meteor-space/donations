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
    'ecmascript',
    'underscore',
    'space:vo-user@0.1.0',
    'space:vo-i18n@0.1.0',
    'space:vo-numeral@0.1.0',
    'space:domain@0.1.0',
    'space:event-sourcing@2.1.0',
    'space:accounts@0.1.3',
    'donations:base'
  ]);

  api.addFiles([
    'source/server/module.js',
    // ORGANIZATIONS
    'source/server/organizations/organization.js',
    'source/server/organizations/organization-router.js',
    'source/server/organizations/org-registration.js',
    'source/server/organizations/org-registration-router.js',
    // APPEALS
    'source/server/appeals/pledge.js',
    'source/server/appeals/appeal.js',
    'source/server/appeals/appeal-router.js'
  ], 'server');

});


Package.onTest(function(api) {

  api.use([
    'mongo',
    'underscore',
    'ecmascript',
    'space:testing@2.0.0',
    'space:testing-event-sourcing@0.1.0',
    'space:vo-user',
    'space:vo-i18n',
    'space:vo-numeral',
    'donations:base',
    'donations:domain',
    'practicalmeteor:munit@2.1.5'
  ]);

  api.addFiles([
    'tests/organizations/organization.tests.js',
    'tests/organizations/org-registration.tests.js',
    'tests/appeals/appeal.tests.js'
  ], 'server');

});
