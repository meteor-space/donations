Space.Object.extend(Donations, 'AppealsController', {

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
      'Donations.EditAppealDraftFormSubmitted': this._onEditAppealDraftFormSubmitted
    }];
  },

  _onAddAppealFormSubmitted(event) {
    this.send(new Donations.DraftAppeal({
      targetId: new Guid(),
      title: event.title,
      requiredQuantity: event.quantity,
      description: event.description,
      organizationId: new Guid(this.orgsStore.adminOrg()._id),
      locationId: new Guid(this.locationDetailsStore.locationId())
    }));
  },

  _onEditAppealDraftFormSubmitted(event) {
    this.send(new Donations.UpdateAppealDraft({
      targetId: new Guid(event.appealId),
      title: event.title,
      requiredQuantity: event.quantity,
      description: event.description
    }));
  }

});
