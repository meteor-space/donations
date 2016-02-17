Space.messaging.Api.extend('Donations.AppealsApi', {

  methods() {
    return [{
      'Donations.DraftAppeal': this._draftAppeal,
      'Donations.UpdateAppealDraft': this._updateAppealDraft,
      'Donations.MakeAppeal': this._makeAppeal,
      'Donations.UpdateAppeal': this._makeAppeal,
      'Donations.MakePledge': this._makePledge
    }];
  },

  _draftAppeal(context, command) {
    if (context.userId == null) {
      throw new Meteor.Error('You are not allowed to draft appeals');
    }
    this.commandBus.send(command);
  },

  _updateAppealDraft(context, command) {
    if (context.userId == null) {
      throw new Meteor.Error('You are not allowed to update appeal drafts');
    }
    this.commandBus.send(command);
  },

  _makeAppeal(context, command) {
    if (context.userId == null) {
      throw new Meteor.Error('You are not allowed to make appeals');
    }
    this.commandBus.send(command);
  },

  _updateAppeal(context, command) {
    if (context.userId == null) {
      throw new Meteor.Error('You are not allowed to draft appeals');
    }
    this.commandBus.send(command);
  },

  _makePledge(context, command) {
    this.commandBus.send(command);
  }

});
