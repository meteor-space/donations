Space.eventSourcing.Process.extend(Donations, 'OrgRegistration', {

  eventCorrelationProperty: 'orgRegistrationId',

  onExtending() {
    this.type('Donations.OrgRegistration');
  },

  STATES: {
    initiated: 'initiated'
  },

  fields: {
    accountRegistrationId: Guid,
    accountId: Guid,
    userId: Guid,
    name: String,
    country: Country,
    contact: Donations.Contact
  },

  commandMap() {
    return {
      'Donations.RegisterOrganization': this._registerOrganization
    };
  },

  eventMap() {
    return {
      'Donations.RegistrationInitiated': this._onRegistrationInitiated
    };
  },

  // ============= COMMAND HANDLERS =============

  _registerOrganization(command) {
    let accountRegistrationId = new Guid();
    let accountId = new Guid();
    let userId = new Guid();
    let eventProps = this._eventPropsFromCommand(command);

    this.trigger(new Space.accounts.Register({
      targetId: accountRegistrationId, // Guid of Space.accounts.Registration
      accountId: accountId,
      userId: userId,
      username: null,
      email: command.contact.email,
      password: command.password
    }));

    this.record(new Donations.RegistrationInitiated(_.extend(eventProps, {
      accountRegistrationId: accountRegistrationId,
      accountId: accountId,
      userId: userId
    })));
  },

  // ============= EVENT HANDLERS =============

  _onRegistrationInitiated(event) {
    this._assignFields(event);
    this._state = this.STATES.initiated;
  }

});

Donations.OrgRegistration.registerSnapshotType('Donations.OrgRegistrationSnapshot');
