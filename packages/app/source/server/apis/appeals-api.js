Space.messaging.Api.extend(Donations, 'AppealsApi', {

  methods() {
    return [{
      'Donations.DraftAppeal': this._draftAppeal,
      'Donations.UpdateAppealDraft': this._updateAppealDraft
    }];
  },

  _draftAppeal(context, command) {
    this.commandBus.send(command);
  },

  _updateAppealDraft(context, command) {
    this.commandBus.send(command);
  }

});
