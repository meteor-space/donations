Space.messaging.define(Space.messaging.Event, 'Donations', {

  OrganizationCreated: {
    name: String,
    country: Country,
    contact: Donations.Contact
  }

});
