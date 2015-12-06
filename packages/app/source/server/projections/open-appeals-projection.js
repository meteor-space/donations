Space.eventSourcing.Projection.extend(Donations, 'OpenAppealsProjection', {

  collections: {
    appeals: 'Donations.OpenAppeals'
  },

  eventSubscriptions() {
    return [{
      'Donations.AppealMade': this._onAppealMade,
      'Donations.AppealUpdated': this._onAppealUpdated,
      'Donations.AppealClosed': this._onAppealNoLongerOpen,
      'Donations.AppealFulfilled': this._onAppealNoLongerOpen
    }];
  },

  _onAppealMade(event) {
    this.appeals.insert(_.extend({}, this._extractAppealDetails(event), {
      _id: event.sourceId.toString(),
      organizationId: event.organizationId.toString(),
      locationId: event.locationId.toString()
    }));
  },

  _onAppealUpdated(event) {
    this.appeals.update(event.sourceId.toString(), {
      $set: { title: event.title, description: event.description }
    });
  },

  _onAppealNoLongerOpen(event) {
    this.appeals.remove(event.sourceId.toString);
  },

  _extractAppealDetails(event) {
    return {
      title: event.title,
      requiredQuantity: event.requiredQuantity.value,
      description: event.description
    };
  }

});