Space.messaging.Publication.extend(Donations, 'OrgPublication', {

  dependencies: {
    organizations: 'Donations.Organizations'
  },

  publications() {
    return [{
      'admin-organization'(context) {
        return this.organizations.find({ adminId: context.userId });
      }
    }];
  }

});
