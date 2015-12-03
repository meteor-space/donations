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
  }
});
