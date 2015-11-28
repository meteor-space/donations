Space.messaging.define(Space.messaging.Command, `Donations`, {

  CreateOrganization: {
    adminId: Guid,
    name: String,
    country: Country,
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
  },

  CloseAppeal: {}

});
