Space.messaging.Publication.extend(Donations, 'Publications', {

  dependencies: {
    organizations: 'Donations.Organizations',
    allAppeals: 'Donations.Appeals',
    openAppeals: 'Donations.OpenAppeals'
  },

  publications() {
    return [{
      'admin-organization'(context) {
        return this.organizations.find({ adminId: context.userId });
      },
      'location-appeals'(context, locationId) {
        check(locationId, Match.OneOf(String, null));
        return this.allAppeals.find({ locationId: locationId });
      },
      'open-appeals'() {
        return this.openAppeals.find();
      }
    }];
  }

});
