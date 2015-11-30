Space.flux.Store.extend(Donations, 'LocationDetailsStore', {

  dependencies: {
    locations: 'Donations.Locations',
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
    this._setReactiveVar('location', this.locations.findOne(this.locationId()));
  },

  _updateAppeals() {
    this._setReactiveVar('appeals', this.appealsCollection.find({
      locationId: this.locationId()
    }).fetch());
  }

});
