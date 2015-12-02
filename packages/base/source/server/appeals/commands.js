Space.messaging.define(Space.messaging.Command, `Donations`, {

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
