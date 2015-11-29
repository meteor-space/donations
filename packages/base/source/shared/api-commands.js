Space.messaging.define(Space.messaging.Command, `Donations`, {

  RegisterOrganization: {
    name: String,
    country: Country,
    contact: Donations.Contact,
    password: Password
  },

  AddLocation: {
    name: String,
    organizationId: Guid,
    address: Donations.Address,
    openingHours: String
  },

  UpdateLocationDetails: {
    name: String,
    address: Donations.Address,
    openingHours: String
  }

});
