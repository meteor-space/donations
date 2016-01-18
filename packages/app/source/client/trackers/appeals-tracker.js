Space.messaging.Tracker.extend('Donations.AppealsTracker', {

  dependencies: {
    store: 'Donations.LocationDetailsStore'
  },

  autorun() {
    this.meteor.subscribe('location-appeals', this.store.locationId());
  }

});
