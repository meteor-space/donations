Space.flux.Store.extend(Donations, 'LocationsStore', {

  dependencies: {
    locations: 'Donations.Locations',
    orgsStore: 'Donations.OrgsStore'
  },

  reactiveVars() {
    return [{
      adminOrgLocations: []
    }];
  },

  computations() {
    return [
      this._updateAdminOrgLocations
    ];
  },

  _updateAdminOrgLocations() {
    let adminOrg = this.orgsStore.adminOrg();
    let adminOrgLocations = null;
    if (adminOrg) {
      adminOrgLocations = this.locations.find({
        organizationId: adminOrg._id
      }).fetch();
    }
    this._setReactiveVar('adminOrgLocations', adminOrgLocations);
  }

});
