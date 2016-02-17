Space.eventSourcing.Process.extend(Donations, 'OrgRegistration', {

  STATES: {
    initiated: 'initiated',
    approved: 'approved',
    adminSignupFailed: 'adminSignupFailed',
    adminSignupCompleted: 'adminSignupCompleted',
    orgCreationFailed: 'orgCreationFailed',
    completed: 'completed'
  },

  fields: {
    adminId: Guid,
    organizationId: Guid,
    name: String,
    country: Country,
    contact: Donations.Contact,
    password: Password,
    error: Match.Optional(Object)
  },

  eventCorrelationProperty: 'Donations.OrgRegistrationId',

  commandMap() {
    return {
      'Donations.RegisterOrganization': this._registerOrganization
    };
  },

  eventMap() {
    return {
      // EXTERNAL
      'Space.accounts.SignupFailed': this._onAccountsSignupFailed,
      'Space.accounts.SignupSuccessful': this._onAccountsSignupSuccessful,
      'Donations.OrganizationCreated': this._onOrganizationCreated,
      // INTERNAL
      'Donations.OrgRegistrationInitiated': this._onRegistrationInitiated,
      'Donations.OrgRegistrationApproved': this._onRegistrationApproved,
      'Donations.OrgRegistrationFailed': this._onRegistrationFailed,
      'Donations.OrganizationAdminSignedUp': this._onOrgAdminSignedUp,
      'Donations.OrgRegistrationCompleted': this._onRegistrationCompleted
    };
  },

  // ============= COMMAND HANDLERS =============

  _registerOrganization(command) {
    let adminId = new Guid();
    let organizationId = new Guid();
    let eventProps = this._eventPropsFromCommand(command);
    // Todo: Omit password from event
    this.record(new Donations.OrgRegistrationInitiated(_.extend(eventProps, {
      adminId: adminId,
      organizationId: organizationId
    })));
    // All registrations are automatically approved, but
    // later an approval aggregate will be implemented
    this.record(new Donations.OrgRegistrationApproved({
      sourceId: this.getId()
    }));
    this.trigger(new Space.accounts.SignupUser({
      targetId: adminId,
      email: command.contact.email,
      password: command.password
    }));
  },

  // ============= EXTERNAL EVENT HANDLERS =============

  _onAccountsSignupFailed(event) {
    this.record(new Donations.OrgRegistrationFailed({
      sourceId: this.getId(),
      error: event.error,
      stage: this.STATES.adminSignupFailed
    }));
  },

  _onAccountsSignupSuccessful() {
    this.record(new Donations.OrgAdminSignedUp({
      sourceId: this.getId(),
      adminId: this.adminId
    }));
    this.trigger(new Donations.CreateOrganization({
      targetId: this.organizationId,
      adminId: this.adminId,
      name: this.name,
      country: this.country,
      contact: this.contact
    }));
  },

  _onOrganizationCreated() {
    this.record(new Donations.OrgRegistrationCompleted({
      sourceId: this.getId()
    }));
  },

  // ============= INTERNAL EVENT HANDLERS =============

  _onRegistrationInitiated(event) {
    this._assignFields(event);
    this._state = this.STATES.initiated;
  },

  _onRegistrationApproved() {
    this._state = this.STATES.approved;
  },

  _onRegistrationFailed(event) {
    this._state = this.STATES[event.stage];
  },

  _onOrgAdminSignedUp() {
    this._state = this.STATES.adminSignupCompleted;
  },

  _onRegistrationCompleted() {
    this._state = this.STATES.completed;
  }

  // ============= HELPERS =============

});

Donations.OrgRegistration.registerSnapshotType(
  'Donations.OrgRegistrationSnapshot'
);
