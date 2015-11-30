Space.flux.BlazeComponent.extend(Donations, 'LocationAdminPage', {

  dependencies: {
    orgsStore: 'Donations.OrgsStore',
    locationDetailsStore: 'Donations.LocationDetailsStore'
  },

  org() {
    return this.orgsStore.adminOrg();
  },

  location() {
    return this.locationDetailsStore.location();
  }
});

Donations.LocationAdminPage.register('location_admin_page');
