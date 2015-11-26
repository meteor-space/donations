Space.messaging.Tracker.extend(Donations, 'OrgsTracker', {

  autorun() {
    this.meteor.subscribe('admin-organization');
  }

});
