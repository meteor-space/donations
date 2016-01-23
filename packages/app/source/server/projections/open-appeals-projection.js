Space.eventSourcing.Projection.extend('Donations.OpenAppealsProjection', {

  dependencies: {
    organizations: 'Donations.Organizations',
    locations: 'Donations.Locations'
  },

  collections: {
    appeals: 'Donations.OpenAppeals'
  },

  eventSubscriptions() {
    return [{
      'Donations.AppealMade': this._onAppealMade,
      'Donations.AppealUpdated': this._onAppealUpdated,
      'Donations.LocationDetailsChanged': this._onLocationDetailsChanged,
      'Donations.PledgeMade': this._onPledgeMade,
      'Donations.AppealClosed': this._onAppealNoLongerOpen,
      'Donations.AppealFulfilled': this._onAppealNoLongerOpen
    }];
  },

  _onAppealMade(event) {
    let orgId = event.organizationId.toString();
    let locationId = event.locationId.toString();
    this.appeals.insert(_.extend({}, this._extractAppealDetails(event), {
      _id: event.sourceId.toString(),
      organization: this.organizations.findOne(orgId, {
        fields: this._projectedOrgFields()
      }),
      location: this.locations.findOne(locationId),
      pledgedQuantity: 0
    }));
  },

  _onAppealUpdated(event) {
    this.appeals.update(event.sourceId.toString(), {
      $set: { title: event.title, description: event.description }
    });
  },

  _onAppealNoLongerOpen(event) {
    this.appeals.remove(event.sourceId.toString());
  },

  _extractAppealDetails(event) {
    return {
      title: event.title,
      requiredQuantity: event.requiredQuantity.value,
      description: event.description
    };
  },

  _onLocationDetailsChanged(event) {
    let appeal = { locationId: event.locationId.toString() };
    this.appeals.update(appeal, {
      $set: {
        location: this.locations.findOne(appeal.locationId)
      }
    });
  },

  _onPledgeMade(event) {
    let quantity = event.quantity.value;
    this.appeals.update(event.sourceId.toString(), {
      $inc: {
        pledgedQuantity: quantity,
        requiredQuantity: -1 * quantity
      }
    });
  },

  _projectedOrgFields() {
    return { _id: 1, name: 1, country: 1, contact: 1 };
  }

});
