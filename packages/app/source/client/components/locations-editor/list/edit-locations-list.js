Space.flux.BlazeComponent.extend(Donations, 'EditLocationsList', {

  dependencies: {
    locationsStore: 'Donations.LocationsStore'
  },

  locations() {
    return this.locationsStore.adminOrgLocations();
  }

});

Donations.EditLocationsList.register('edit_locations_list');
