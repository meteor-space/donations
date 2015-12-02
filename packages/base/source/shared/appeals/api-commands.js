Space.messaging.define(Space.messaging.Command, `Donations`, {

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
