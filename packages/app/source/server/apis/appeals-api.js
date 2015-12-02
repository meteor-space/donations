Space.messaging.Api.extend(Donations, 'AppealsApi', {

  methods() {
    return [{
      'Donations.DraftAppeal': this._draftAppeal
    }];
  },

  _draftAppeal(context, command) {
    this.commandBus.send(command);
  }

});
