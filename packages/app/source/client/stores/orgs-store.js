Space.flux.Store.extend(Donations, 'OrgsStore', {

  dependencies: {
    organizations: 'Donations.Organizations',
    currentUserStore: 'Space.accountsUi.CurrentUserStore'
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

  _updateAdminOrg() {
    this._setReactiveVar('adminOrg', this.organizations.findOne({
      adminId: this.currentUserStore.userId()
    }));
  }

});
