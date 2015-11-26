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
    id: Guid,
    donor: Donations.Contact,
    quantity: Quantity
  },

  AppealFulfilled: {
    title: String,
    requiredQuantity: Quantity,
    organizationId: Guid,
    locationId: Guid,
    description: Match.Optional(String)
  },

  PledgeAccepted: {
    id: Guid,
    donor: Donations.Contact,
    quantity: Quantity
  },

  PledgeDeclined: {
    id: Guid,
    donor: Donations.Contact,
    quantity: Quantity
  },

  PledgeFulfilled: {
    id: Guid,
    donor: Donations.Contact,
    quantity: Quantity
  },

  PledgeReneged: {
    id: Guid,
    donor: Donations.Contact,
    quantity: Quantity
  },

  AppealClosed: {
    title: String,
    requiredQuantity: Quantity,
    organizationId: Guid,
    locationId: Guid,
    description: Match.Optional(String)
  }

});
