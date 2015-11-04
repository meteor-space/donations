Space.messaging.define(Space.messaging.Command, 'Donations', {

  CreateOrganization: {
    name: String,
    country: Country,
    contact: Donations.Contact
  }

});
