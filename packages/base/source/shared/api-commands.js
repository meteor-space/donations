Space.messaging.define(Space.messaging.Command, `Donations`, {

  RegisterOrganization: {
    name: String,
    country: Country,
    contact: Donations.Contact,
    password: Password
  }

});
