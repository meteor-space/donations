Space.messaging.define(Space.messaging.Command, `Donations`, {

  CreateOrganization: {
    name: String,
    country: Country,
    contact: Donations.Contact
  },

  AddLocation: {
    name: String,
    organizationId: Guid,
    address: Donations.Address,
    contact: Donations.Contact
  },

  MakeAppeal: {
    title: String,
    requiredQuantity: Quantity,
    organizationId: Guid,
    locationId: Guid,
    description: Match.Optional(String)
  },

  MakePledge: {
    pledgeId: Guid,
    quantity: Quantity,
    donor: Donations.Contact
  }

});
