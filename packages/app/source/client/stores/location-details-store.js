Space.flux.Store.extend(Donations, 'LocationDetailsStore', {

  dependencies: {
    locations: 'Donations.Locations'
  },

  reactiveVars() {
    return [{
      locationId: null,
      location: null
    }];
  },

  eventSubscriptions() {
    return [{
      'Donations.RouteTriggered': this._onRouteTriggered
    }];
  },

  computations() {
    return [
      this._updateLocation
    ];
  },

  _onRouteTriggered(event) {
    if (event.routeName === 'locationAdmin') {
      this._setReactiveVar('locationId', event.params.id);
    }
  },

  _updateLocation() {
    this._setReactiveVar('location', this.locations.findOne(this.locationId()));
  }

});
