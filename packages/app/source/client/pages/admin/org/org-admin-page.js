Space.flux.BlazeComponent.extend('Donations.OrgAdminPage', {

  dependencies: {
    store: 'Donations.OrgsStore'
  },

  org() {
    return this.store.adminOrg();
  }
});

Donations.OrgAdminPage.register('org_admin_page');
