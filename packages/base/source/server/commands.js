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
    id: Guid,
    donor: Donations.Contact,
    quantity: Quantity,
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

  RenegOnPledge: {
    id: Guid
  },

  CloseAppeal: {}

});
