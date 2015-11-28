Space.flux.BlazeComponent.extend(Donations, 'AdminOrgLocationsList', {

  dependencies: {
    locationsStore: 'Donations.LocationsStore'
  },

  locations() {
    return this.locationsStore.adminOrgLocations();
  }

});

Donations.AdminOrgLocationsList.register('admin_org_locations_list');
