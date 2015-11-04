Space.messaging.define(Space.messaging.Event, 'Donations', {

  OrganizationCreated: {
    name: String,
    country: Country,
    contact: Donations.Contact
  },

  LocationAdded: {
    name: String,
    organizationId: Guid,
    address: Donations.Address,
    contact: Donations.Contact
  }

});
