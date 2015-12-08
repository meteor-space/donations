Space.eventSourcing.Projection.extend(Donations, 'OpenAppealsProjection', {

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
      'Donations.AppealClosed': this._onAppealNoLongerOpen,
      'Donations.AppealFulfilled': this._onAppealNoLongerOpen,
      'Donations.LocationDetailsChanged': this._onLocationDetailsChanged
    }];
  },

  _onAppealMade(event) {
    let orgId = event.organizationId.toString();
    let locationId = event.locationId.toString();
    this.appeals.insert(_.extend({}, this._extractAppealDetails(event), {
      _id: event.sourceId.toString(),
      organizationId: orgId,
      organizationName: this.organizations.findOne(orgId).name,
      locationId: locationId,
      locationName: this.locations.findOne(locationId).name,
      pledgedQuantity: 0
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
  },

  _onLocationDetailsChanged(event) {
    let appeal = { locationId: event.locationId.toString() };
    this.appeals.update(appeal, {
      $set: {
        locationName: event.name
      }
    });
  }

});
