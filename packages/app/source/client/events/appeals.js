Space.messaging.define(Space.messaging.Event, 'Donations', {

  AddAppealFormSubmitted: {
    title: String,
    quantity: String,
    description: String
  },

  EditAppealDraftFormSubmitted: {
    appealId: String,
    title: String,
    quantity: String,
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
