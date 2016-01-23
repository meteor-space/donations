Space.Object.extend('Donations.AppealsController', {

  mixin: [
    Space.messaging.EventSubscribing,
    Space.messaging.CommandSending
  ],

  dependencies: {
    orgsStore: 'Donations.OrgsStore',
    locationDetailsStore: 'Donations.LocationDetailsStore'
  },

  eventSubscriptions() {
    return [{
      'Donations.AddAppealFormSubmitted': this._onAddAppealFormSubmitted,
      'Donations.EditAppealDraftFormSubmitted': this._onEditAppealDraftFormSubmitted,
      'Donations.AppealMade': this._onAppealMade,
      'Donations.EditAppealFormSubmitted': this._onEditAppealFormSubmitted,
      'Donations.MakePledgeFormSubmitted': this._onMakePledgeFormSubmitted
    }];
  },

  _onAddAppealFormSubmitted(event) {
    this.send(new Donations.DraftAppeal({
      targetId: new Guid(),
      title: event.title,
      requiredQuantity: new Quantity(parseInt(event.requiredQuantity, 10)),
      description: event.description,
      organizationId: new Guid(this.orgsStore.adminOrg()._id),
      locationId: new Guid(this.locationDetailsStore.locationId())
    }));
  },

  _onEditAppealDraftFormSubmitted(event) {
    this.send(new Donations.UpdateAppealDraft({
      targetId: new Guid(event.appealId),
      title: event.title,
      requiredQuantity: new Quantity(parseInt(event.requiredQuantity, 10)),
      description: event.description
    }));
  },

  _onAppealMade(event) {
    this.send(new Donations.MakeAppeal({ targetId: new Guid(event.appealId) }));
  },

  _onEditAppealFormSubmitted(event) {
    this.send(new Donations.UpdateAppeal({
      targetId: new Guid(event.appealId),
      title: event.title,
      description: event.description
    }));
  },

  _onMakePledgeFormSubmitted(event) {
    this.send(new Donations.MakePledge({
      targetId: event.appealId,
      id: new Guid(),
      donor: event.donor,
      quantity: event.quantity
    }));
  }

});
