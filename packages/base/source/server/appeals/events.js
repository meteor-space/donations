Space.messaging.define(Space.messaging.Event, `Donations`, {

  AppealDrafted: {
    title: String,
    requiredQuantity: Quantity,
    organizationId: Guid,
    locationId: Guid,
    description: Match.Optional(String)
  },

  AppealMade: {
    title: String,
    requiredQuantity: Quantity,
    organizationId: Guid,
    locationId: Guid,
    description: Match.Optional(String)
  },

  AppealCancelled: {
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

  PledgeWrittenOff: {
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
