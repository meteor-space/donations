Space.flux.Store.extend(Donations, 'LocationDetailsStore', {

  dependencies: {
    orgsStore: 'Donations.OrgsStore',
    appealsCollection: 'Donations.Appeals'
  },

  reactiveVars() {
    return [{
      locationId: null,
      location: null,
      appeals: null
    }];
  },

  eventSubscriptions() {
    return [{
      'Donations.RouteTriggered': this._onRouteTriggered
    }];
  },

  computations() {
    return [
      this._updateLocation,
      this._updateAppeals
    ];
  },

  _onRouteTriggered(event) {
    if (event.routeName === 'locationAdmin') {
      this._setReactiveVar('locationId', event.params.id);
    }
  },

  _updateLocation() {
    let adminOrg = this.orgsStore.adminOrg();
    let locationId = this.locationId();
    let adminLocation = null;
    if (adminOrg !== null && adminOrg !== undefined) {
      for (let location of adminOrg.locations) {
        if (location._id === locationId) adminLocation = location;
      }
    }
    this._setReactiveVar('location', adminLocation);
  },

  _updateAppeals() {
    this._setReactiveVar('appeals', this.appealsCollection.find({
      locationId: this.locationId()
    }).fetch());
  }

});
