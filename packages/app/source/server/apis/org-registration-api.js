Space.messaging.Api.extend(Donations, 'OrgRegistrationApi', {

  methods() {
    return [{
      'Donations.RegisterOrganization': this._registerOrganization,
      'Donations.RetryOrgRegistration': this._registerOrganization
    }];
  },

  _registerOrganization(context, command) {
    this.commandBus.send(command);
  }

});
