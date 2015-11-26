Space.eventSourcing.Projection.extend(Donations, 'OrgProjection', {

  collections: {
    organizations: 'Donations.Organizations'
  },

  eventSubscriptions() {
    return [{
      'Donations.OrganizationCreated': this._onOrganizationCreated
    }];
  },

  _onOrganizationCreated(event) {
    this.organizations.insert({
      _id: event.sourceId.toString(),
      adminId: event.adminId.toString(),
      name: event.name,
      country: event.country.toString(),
      contact: {
        name: event.contact.name,
        email: event.contact.email.toString(),
        phone: event.contact.phone
      }
    });
  }

});
