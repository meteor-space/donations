Package.describe({
  name: 'donations:app',
  version: '0.1.0',
  summary: 'Space.Application for the open source solution for managing goods appeals',
  git: 'https://github.com/meteor-space/donations',
  documentation: 'README.md'
});

Package.onUse(function(api) {

  api.versionsFrom('1.2.1');

  api.use([
    'meteor-base',
    'standard-minifiers',
    'templating',
    'blaze-html-templates',
    'spacebars',
    'mongo',
    'session',
    'check',
    'reactive-dict',
    'ecmascript',
    'sha',
    'peerlibrary:blaze-components@0.15.0',
    'meteorhacks:flow-router@1.19.0',
    'kadira:blaze-layout@2.1.0',
    'meteorhacks:subs-manager@1.6.2',
    'juliancwirko:zf5@2.0.2',
    'space:base@3.1.0',
    'space:messaging@2.1.0',
    'space:event-sourcing@2.1.0',
    'space:flux@0.6.0',
    'space:accounts@0.1.3',
    'space:accounts-ui@0.2.0',
    'space:vo-user@0.2.1',
    'space:vo-i18n@0.1.0',
    'donations:base',
    'donations:domain',
    'space:vo-user@0.1.0',
    'space:vo-i18n@0.1.0'
  ]);

  // SERVER
  api.addFiles([
    'source/server/application.js',
    'source/server/organization-api.js'
    'source/server/dev-data-setup.js'
  ], 'server');

  // ASSETS
  api.addAssets([
    'source/client/pages/index/images/donations-icon.svg',
    'source/client/pages/index/images/find-org-icon.svg',
    'source/client/pages/index/images/deliver-icon.svg',
    'source/client/pages/index/images/receive-icon.svg',
    'source/client/pages/index/images/request-icon.svg'
  ], 'client');

  // CLIENT
  api.addFiles([
    // STYLES
    // --> settings
    'source/client/styles/settings/_colors.scss',
    'source/client/styles/settings/_foundation.scss',
    // --> mixins
    'source/client/styles/mixins/_font.scss',
    'source/client/styles/mixins/_headline.scss',
    'source/client/main.scss',
    // LAYOUTS
    'source/client/layouts/head.html',
    'source/client/layouts/standard-layout.html',
    'source/client/layouts/_standard-layout.scss',
    // PAGES
    // --> landing page
    'source/client/pages/index/landing-page.html',
    'source/client/pages/index/landing-page.js',
    'source/client/pages/index/_landing-page.scss',
    // --> registration form
    'source/client/pages/register/registration-form.html',
    'source/client/pages/register/registration-form.js',
    'source/client/pages/register/_registration-form.scss',
    // CONTROLLERS
    'source/client/controllers/route-controller.js',
    'source/client/controllers/layout-controller.js',
    // APP
    'source/client/events.js',
    'source/client/router.js',
    'source/client/application.js'
  ], 'client');

  // Startup
  api.addFiles([
    'source/startup.js'
  ]);

});

Package.onTest(function(api) {

  api.use([
    'mongo',
    'ecmascript',
    'space:testing@2.0.0',
    'donations:base',
    'donations:domain',
    'donations:app',
    'space:vo-user@0.1.0',
    'space:vo-i18n@0.1.0',
    'practicalmeteor:munit@2.1.5'
  ]);

  api.addFiles([
    'tests/server/organization-api.tests.js'
  ], 'server');

});
