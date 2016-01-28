Space.ui.BlazeComponent.extend('Donations.LocationsEditor', {

  dependencies: {
    orgsStore: 'Donations.OrgsStore'
  },

  adminLocations() {
    if (this.orgsStore.adminOrg()) {
      return this.orgsStore.adminOrg().locations;
    } else {
      return [];
    }
  }

});

Donations.LocationsEditor.register('locations_editor');
