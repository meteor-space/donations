Space.eventSourcing.Projection.extend(Donations, 'OrgRegistrationsProjection', {

  collections: {
    signups: 'Space.accountsUi.Signups'
  },

  eventSubscriptions() {
    return [{
      'Donations.OrgRegistrationInitiated': this._onOrgRegistrationInitiated,
      'Donations.OrgRegistrationFailed': this._onOrgRegistrationFailed,
      'Donations.OrgRegistrationCompleted': this._onOrgRegistrationCompleted
    }];
  },

  _onOrgRegistrationInitiated(event) {
    this.signups.insert({
      _id: event.sourceId.toString(),
      adminId: event.adminId.toString(),
      organizationId: event.organizationId.toString(),
      state: 'initiated'
    });
  },

  _onOrgRegistrationFailed(event) {
    this.signups.update(event.sourceId.toString(), { $set: {
      error: event.error,
      state: event.stage
    }});
  },

  _onOrgRegistrationCompleted(event) {
    this.signups.update(event.sourceId.toString(), {
      $unset: { error: '' },
      $set: { state: 'completed' }
    });
  }

});
