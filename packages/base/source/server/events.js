Space.messaging.define(Space.messaging.Event, `Donations`, {

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
  },

  AppealMade: {
    title: String,
    requiredQuantity: Quantity,
    organizationId: Guid,
    locationId: Guid,
    description: Match.Optional(String)
  },

  PledgeMade: {
    pledgeId: Guid,
    quantity: Quantity,
    donor: Donations.Contact
  },

  AppealFulfilled: {},

  PledgeFulfilled: {
    pledgeId: Guid
  }

});
