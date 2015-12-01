Space.messaging.define(Space.messaging.Command, `Donations`, {

  // REGISTRATION

  RegisterOrganization: {
    name: String,
    country: Country,
    contact: Donations.Contact,
    password: Password
  },

  // LOCATIONS

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
  },

  // APPEALS

  DraftAppeal: {
    title: String,
    requiredQuantity: Quantity,
    organizationId: Guid,
    locationId: Guid,
    description: Match.Optional(String)
  },

  MakeAppeal: {},

  CancelAppeal: {}

});
