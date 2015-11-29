Space.flux.BlazeComponent.extend(Donations, 'LocationsEditor', {

  dependencies: {
    locationsStore: 'Donations.LocationsStore'
  },

  adminLocations() {
    return this.locationsStore.adminOrgLocations();
  }

});

Donations.LocationsEditor.register('locations_editor');
