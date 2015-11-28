Space.messaging.Tracker.extend(Donations, 'LocationsTracker', {

  autorun() {
    this.meteor.subscribe('admin-locations');
  }

});
