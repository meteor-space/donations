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
    'accounts-password',
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
    'donations:domain'
  ]);

  // SERVER
  api.addFiles([
    'source/server/application.js',
    'source/server/dev-data-setup.js',
    'source/server/apis/org-registration-api.js',
    'source/server/projections/org-registrations-projection.js',
    'source/server/projections/org-projection.js',
    'source/server/publications/org-publication.js'
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
    // --> Modules
    'source/client/styles/modules/_form.scss',
    // LAYOUTS
    'source/client/layouts/head.html',
    'source/client/layouts/standard-layout.html',
    'source/client/layouts/_standard-layout.scss',
    // PAGES
    'source/client/pages/_page.scss',
    // --> landing page
    'source/client/pages/index/landing-page.html',
    'source/client/pages/index/landing-page.js',
    'source/client/pages/index/_landing-page.scss',
    // --> Org admin page
    'source/client/pages/org/_org-admin-page.scss',
    'source/client/pages/org/org-admin-page.html',
    'source/client/pages/org/org-admin-page.js',
    // --> Register org page
    'source/client/pages/register/_register-page.scss',
    'source/client/pages/register/register-page.html',
    // COMPONENTS
    'source/client/components/registration-form/_registration-form.scss',
    'source/client/components/registration-form/registration-form.html',
    'source/client/components/registration-form/registration-form.js',
    'source/client/components/login-form/login-form.html',
    'source/client/components/login-form/login-form.js',
    'source/client/components/logout-button/logout-button.js',
    'source/client/components/logout-button/logout-button.html',
    // CONTROLLERS
    'source/client/controllers/route-controller.js',
    'source/client/controllers/layout-controller.js',
    'source/client/controllers/org-registrations-controller.js',
    'source/client/controllers/login-controller.js',
    // STORES
    'source/client/stores/org-registrations-store.js',
    'source/client/stores/orgs-store.js',
    // TRACKERS
    'source/client/trackers/orgs-tracker.js',
    // APP
    'source/client/events.js',
    'source/client/router.js',
    'source/client/application.js'
  ], 'client');

  // SHARED
  api.addFiles([
    'source/shared/startup.js',
    'source/shared/collections/organizations.js'
  ]);

  api.export('Donations');

});

Package.onTest(function(api) {

  api.use([
    'mongo',
    'donations:app',
    'practicalmeteor:munit@2.1.5',
    'space:testing@2.0.0'
  ]);

});
