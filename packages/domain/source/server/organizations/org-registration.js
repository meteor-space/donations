Space.eventSourcing.Process.extend(Donations, 'OrgRegistration', {

  onExtending() {
    this.type('Donations.Registration');
  },

  STATES: {
    initiated: 'initiated',
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
      'Donations.RegisterOrganization': this._registerOrganization,
      'Donations.RetryOrgRegistration': this._retry
    };
  },

  eventMap() {
    return {
      // INTERNAL
      'Donations.OrgRegistrationInitiated': this._onRegistrationInitiated,
      'Donations.OrganizationCreated': this._onOrganizationCreated,
      'Donations.OrganizationAdminSignedUp': this._onOrgAdminSignedUp,
      'Donations.OrgRegistrationFailed': this._onRegistrationFailed,
      'Donations.OrgRegistrationCompleted': this._onRegistrationCompleted,
      // EXTERNAL
      'Space.accounts.SignupFailed': this._onAccountsSignupFailed,
      'Space.accounts.SignupSuccessful': this._onAccountsSignupSuccessful
    };
  },

  // ============= COMMAND HANDLERS =============

  _registerOrganization(command) {
    let adminId = new Guid();
    let organizationId = new Guid();
    let eventProps = this._eventPropsFromCommand(command);

    this.record(new Donations.OrgRegistrationInitiated(_.extend(eventProps, {
      adminId: adminId,
      organizationId: organizationId
    })));
    this.trigger(new Space.accounts.SignupUser({
      targetId: adminId,
      email: command.contact.email,
      password: command.password
    }));
  },

  _retry(command) {
    this.record(new Donations.OrgRegistrationRetried(
      this._eventPropsFromCommand(command)
    ));
    if (this.hasState(this.STATES.adminSignupFailed)) {
      this.trigger(new Space.accounts.SignupUser({
        targetId: this.adminId,
        email: command.contact.email,
        password: command.password
      }));
    }
    if (this.hasState(this.STATES.orgCreationFailed)) {
      this.trigger(new Donations.CreateOrganization({
        targetId: command.organizationId,
        adminId: this.adminId,
        name: command.name,
        country: command.country,
        contact: command.contact
      }));
    }
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

  _onOrgAdminSignedUp() {
    this._state = this.STATES.adminSignupCompleted;
  },

  _onRegistrationFailed(event) {
    this._state = this.STATES[event.stage];
  },

  _onRegistrationCompleted() {
    this._state = this.STATES.completed;
  }

  // ============= HELPERS =============

});

Donations.OrgRegistration.registerSnapshotType(
  'Donations.OrgRegistrationSnapshot'
);
