Space.messaging.Api.extend(Donations, 'AppealsApi', {

  methods() {
    return [{
      'Donations.MakeAppeal': this._makeAppeal
    }];
  },

  _makeAppeal(context, command) {
    this.commandBus.send(command);
  }

});
