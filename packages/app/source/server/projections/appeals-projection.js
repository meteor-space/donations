Space.eventSourcing.Projection.extend(Donations, 'AppealsProjection', {

  collections: {
    appeals: 'Donations.Appeals'
  },

  eventSubscriptions() {
    return [{
      'Donations.AppealMade': this._onAppealMade
    }];
  },

  _onAppealMade(event) {
    this.appeals.insert({
      _id: event.sourceId.toString(),
      title: event.title,
      requiredQuantity: event.requiredQuantity.value,
      description: event.description,
      organizationId: event.organizationId.toString(),
      locationId: event.locationId.toString()
    });
  }

});