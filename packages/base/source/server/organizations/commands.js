Space.messaging.define(Space.domain.Command, `Donations`, {

  CreateOrganization: {
    adminId: Guid,
    name: String,
    country: Country,
    contact: Donations.Contact
  }

});
