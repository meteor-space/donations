Space.messaging.define(Space.messaging.Command, `Donations`, {

  DraftAppeal: {
    title: String,
    requiredQuantity: Quantity,
    organizationId: Guid,
    locationId: Guid,
    description: Match.Optional(String)
  },

  UpdateAppealDraft: {
    title: String,
    requiredQuantity: Quantity,
    description: Match.Optional(String)
  },

  MakeAppeal: {},

  UpdateAppeal: {
    title: String,
    description: Match.Optional(String)
  },

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
