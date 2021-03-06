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
    'blaze',
    'spacebars',
    'mongo',
    'session',
    'check',
    'reactive-dict',
    'ecmascript',
    'sha',
    'accounts-password',
    'tap:i18n@1.7.0',
    'peerlibrary:blaze-components@0.15.0',
    'meteorhacks:flow-router@1.19.0',
    'kadira:blaze-layout@2.1.0',
    'meteorhacks:subs-manager@1.6.2',
    'percolate:migrations@0.9.7',
    'space:base@4.1.1',
    'space:messaging@3.1.1',
    'space:event-sourcing@3.0.0',
    'space:flux@0.7.0',
    'space:accounts@0.2.0',
    'space:accounts-ui@0.3.0',
    'space:vo-user@0.3.0',
    'space:vo-i18n@0.2.0',
    'space:vo-numeral@0.2.0',
    'donations:base',
    'donations:domain'
  ]);

  // SERVER
  api.addFiles([
    'source/server/settings.js',
    'source/server/application.js',
    'source/server/dev-data-setup.js',
    // APIS
    'source/server/apis/org-registration-api.js',
    'source/server/apis/org-api.js',
    'source/server/apis/appeals-api.js',
    // PROJECTIONS
    'source/server/projections/org-registrations-projection.js',
    'source/server/projections/org-projection.js',
    'source/server/projections/locations-projection.js',
    'source/server/projections/appeals-projection.js',
    'source/server/projections/open-appeals-projection.js',
    'source/server/publications.js',
    // MIGRATIONS
    // sample migration:
    // 'source/server/migrations/example_1449766484513_rebuild_appeals_projection.js'
  ], 'server');

  // i18n - Must load before templates
  api.addFiles('config/package-tap.i18n', ['client', 'server']);

  // CLIENT
  api.addFiles([
    // LAYOUTS
    'source/client/layouts/head.html',
    'source/client/layouts/standard-layout.html',
    // --> landing page
    'source/client/pages/index/landing-page.html',
    'source/client/pages/index/landing-page.js',
    // --> open appeals page
    'source/client/pages/open-appeals/open-appeals-page.html',
    'source/client/pages/open-appeals/open-appeals-page.js',
    // ==> Admin pages
    // ------> Organization admin
    'source/client/pages/admin/org/org-admin-page.html',
    'source/client/pages/admin/org/org-admin-page.js',
    // ------> Location admin
    'source/client/pages/admin/location/location-admin-page.html',
    'source/client/pages/admin/location/location-admin-page.js',
    // --> Login page
    'source/client/pages/login/login-page.html',
    // --> Register org page
    'source/client/pages/register/register-page.html',
    // COMPONENTS
    'source/client/components/registration-form/registration-form.html',
    'source/client/components/registration-form/registration-form.js',
    'source/client/components/login-form/login-form.html',
    'source/client/components/login-form/login-form.js',
    'source/client/components/login-button/login-button.js',
    'source/client/components/login-button/login-button.html',
    'source/client/components/org-admin-page-link/org-admin-page-link.js',
    'source/client/components/org-admin-page-link/org-admin-page-link.html',

    // ===> Location Editor
    'source/client/components/locations-editor/locations-editor.html',
    'source/client/components/locations-editor/locations-editor.js',
    'source/client/components/locations-editor/location-form.html',
    'source/client/components/locations-editor/location-form.js',
    // ---------> add location
    'source/client/components/locations-editor/add/add-location-form.html',
    'source/client/components/locations-editor/add/add-location-form.js',
    // ---------> list locations
    'source/client/components/locations-editor/list/edit-locations-list.html',
    'source/client/components/locations-editor/list/edit-locations-list-item.html',
    'source/client/components/locations-editor/list/edit-locations-list-item.js',
    // ---------> edit locations
    'source/client/components/locations-editor/edit/edit-location-form.html',
    'source/client/components/locations-editor/edit/edit-location-form.js',

    // ===> Appeals Editor
    'source/client/components/appeals-editor/appeals-editor.html',
    'source/client/components/appeals-editor/appeals-editor.js',
    'source/client/components/appeals-editor/appeal-form.html',
    'source/client/components/appeals-editor/appeal-form.js',
    // ---------> add appeal
    'source/client/components/appeals-editor/add/add-appeal-form.html',
    'source/client/components/appeals-editor/add/add-appeal-form.js',
    // ---------> list appeals
    'source/client/components/appeals-editor/list/edit-appeals-list-item.html',
    'source/client/components/appeals-editor/list/edit-appeals-list.html',
    'source/client/components/appeals-editor/list/edit-appeals-list-item.js',
    'source/client/components/appeals-editor/list/appeal-pledges-list-item.html',
    // ---------> list open appeals
    'source/client/components/open-appeals-list/open-appeals-list.html',
    'source/client/components/open-appeals-list/open-appeals-list-item.html',
    'source/client/components/open-appeals-list/open-appeals-list-item.js',
    'source/client/components/open-appeals-list/make-pledge-form.html',
    'source/client/components/open-appeals-list/make-pledge-form.js',
    // ---------> edit appeal
    'source/client/components/appeals-editor/edit/edit-appeal-form.html',
    'source/client/components/appeals-editor/edit/edit-appeal-form.js',

    // CONTROLLERS
    'source/client/controllers/route-controller.js',
    'source/client/controllers/layout-controller.js',
    'source/client/controllers/org-registrations-controller.js',
    'source/client/controllers/orgs-controller.js',
    'source/client/controllers/login-controller.js',
    'source/client/controllers/appeals-controller.js',
    // HIGH-LEVEL STORES
    'source/client/stores/orgs-store.js',
    'source/client/stores/location-details-store.js',
    'source/client/stores/open-appeals-store.js',
    // TRACKERS
    'source/client/trackers/orgs-tracker.js',
    'source/client/trackers/appeals-tracker.js',
    // APP
    'source/client/events/app.js',
    'source/client/events/appeals.js',
    'source/client/events/organisations.js',
    'source/client/router.js',
    'source/client/application.js'
  ], 'client');

  // i18n - Must load after templates
  api.addFiles([
    'lib/i18n/en.i18n.json',
    'lib/i18n/en-GB.i18n.json',
    'lib/i18n/de.i18n.json'
  ]);

  // SHARED
  api.addFiles([
    'source/shared/startup.js',
    'source/shared/collections.js'
  ]);

  api.export('Donations');

});

Package.onTest(function(api) {

  api.use([
    'mongo',
    'donations:app',
    'practicalmeteor:munit@2.1.5',
    'space:testing@3.0.0'
  ]);

});
