Space.messaging.define(Space.messaging.Event, 'Donations', {

  AddAppealFormSubmitted: {
    title: String,
    quantity: Quantity,
    description: String
  },

  EditAppealDraftFormSubmitted: {
    appealId: String,
    title: String,
    quantity: Quantity,
    description: String
  },

  EditAppealFormSubmitted: {
    appealId: String,
    title: String,
    description: String
  },

  AppealMade: {
    appealId: String
  },

  MakePledgeFormSubmitted: {
    appealId: String,
    quantity: Quantity,
    donor: Donations.Contact
  }
});
