Space.messaging.define(Space.messaging.Command, `Donations`, {

  CreateOrganization: {
    adminId: Guid,
    name: String,
    country: Country,
    contact: Donations.Contact
  }

});
