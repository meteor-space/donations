Space.flux.Store.extend(Donations, 'OrgsStore', {

  dependencies: {
    organizations: 'Donations.Organizations',
    usersStore: 'Space.accountsUi.UsersStore'
  },

  reactiveVars() {
    return [{
      adminOrg: null
    }];
  },

  computations() {
    return [
      this._updateAdminOrg
    ];
  },

  findOrg(orgId) {
    return this.organizations.findOne(orgId);
  },

  findLocation(orgId, locationId) {
    let org = this.organizations.findOne(orgId);
    let foundLocation = null;
    if (org) {
      for (let location of org.locations) {
        if (location._id === locationId) {
          foundLocation = location;
        }
      }
    }
    return foundLocation;
  },

  _updateAdminOrg() {
    this._setReactiveVar('adminOrg', this.organizations.findOne({
      adminId: this.usersStore.userId()
    }));
  }

});
