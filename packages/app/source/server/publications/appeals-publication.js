Space.messaging.Publication.extend(Donations, 'AppealsPublication', {

  dependencies: {
    appeals: 'Donations.Appeals'
  },

  publications() {
    return [{
      'location-appeals'(context, locationId) {
        check(locationId, Match.OneOf(String, null));
        return this.appeals.find({ locationId: locationId });
      }
    }];
  }

});
