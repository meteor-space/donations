Space.eventSourcing.Projection.extend(Donations, 'AppealsProjection', {

  collections: {
    appeals: 'Donations.Appeals'
  },

  eventSubscriptions() {
    return [{
      'Donations.AppealDrafted': this._onAppealDrafted,
      'Donations.AppealDraftUpdated': this._onAppealDraftUpdated,
      'Donations.AppealMade': this._onAppealMade
    }];
  },

  _onAppealDrafted(event) {
    this.appeals.insert(_.extend({}, this._extractAppealDetails(event), {
      _id: event.sourceId.toString(),
      organizationId: event.organizationId.toString(),
      locationId: event.locationId.toString(),
      state: 'drafted'
    }));
  },

  _onAppealDraftUpdated(event) {
    this.appeals.update(event.sourceId.toString(), {
      $set: this._extractAppealDetails(event)
    });
  },

  _onAppealMade(event) {
    this.appeals.update(event.sourceId.toString(), { $set: { state: 'made' } });
  },

  _extractAppealDetails(event) {
    return {
      title: event.title,
      requiredQuantity: event.requiredQuantity.value,
      description: event.description
    };
  }

});
