Space.messaging.define(Space.messaging.Command, `Donations`, {

  RegisterOrganization: {
    name: String,
    country: Country,
    contact: Donations.Contact,
    password: Password
  },

  AddLocation: {
    name: String,
    locationId: Guid,
    address: Donations.Address,
    openingHours: String
  },

  UpdateLocationDetails: {
    locationId: Guid,
    name: String,
    address: Donations.Address,
    openingHours: String
  }

});
