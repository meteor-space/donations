Space.ui.defineEvents('Donations', {

  AddAppealFormSubmitted: {
    title: String,
    requiredQuantity: String,
    description: String
  },

  EditAppealDraftFormSubmitted: {
    appealId: String,
    title: String,
    requiredQuantity: String,
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
