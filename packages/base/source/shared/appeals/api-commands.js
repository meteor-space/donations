Space.messaging.define(Space.messaging.Command, `Donations`, {

  DraftAppeal: {
    title: String,
    requiredQuantity: Quantity,
    organizationId: Guid,
    locationId: Guid,
    description: Match.Optional(String)
  },

  MakeAppeal: {},

  CancelAppeal: {},

  CloseAppeal: {},

  MakePledge: {
    id: Guid,
    donor: Donations.Contact,
    quantity: Quantity
  },

  AcceptPledge: {
    id: Guid
  },

  DeclinePledge: {
    id: Guid
  },

  FulfillPledge: {
    id: Guid
  },

  WriteOffPledge: {
    id: Guid
  }

});
