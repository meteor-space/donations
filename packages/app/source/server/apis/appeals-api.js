Space.messaging.Api.extend(Donations, 'AppealsApi', {

  methods() {
    return [{
      'Donations.DraftAppeal': this._draftAppeal,
      'Donations.UpdateAppealDraft': this._updateAppealDraft,
      'Donations.MakeAppeal': this._makeAppeal
    }];
  },

  _draftAppeal(context, command) {
    this.commandBus.send(command);
  },

  _updateAppealDraft(context, command) {
    this.commandBus.send(command);
  },

  _makeAppeal(context, command) {
    this.commandBus.send(command);
  }

});
