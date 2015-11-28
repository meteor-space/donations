Space.messaging.Publication.extend(Donations, 'LocationsPublication', {

  dependencies: {
    organizations: 'Donations.Organizations',
    locations: 'Donations.Locations'
  },

  publications() {
    return [{
      'admin-locations'(context) {
        let adminOrg = this.organizations.findOne({ adminId: context.userId });
        if (adminOrg) {
          return this.locations.find({ organizationId: adminOrg._id });
        } else {
          context.ready(); // Nothing to publish yet
        }
      }
    }];
  }

});
