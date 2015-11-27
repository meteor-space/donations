Space.flux.Store.extend(Donations, 'OrgRegistrationsStore', {

  dependencies: {
    signupStore: 'Space.accountsUi.SignupsStore'
  },

  _session: 'Donations.OrgRegistrationStore',

  sessionVars() {
    return [{
      orgName: '',
      orgCountry: '',
      contactEmail: '',
      contactName: '',
      contactPhone: ''
    }];
  },

  reactiveVars() {
    return [{
      password: '',
      error: null
    }];
  },

  computations() {
    return [
      this._observeSignupState
    ];
  },

  eventSubscriptions() {
    return [{
      'Donations.OrgRegistrationInputsChanged': this._onOrgRegistrationInputsChanged
    }];
  },

  _onOrgRegistrationInputsChanged(event) {
    let cleanedEventProps = _.omit(event, 'timestamp', 'eventVersion', 'version');
    for (key in cleanedEventProps.fields()) {
      if (key !== 'password') {
        this._setSessionVar(key, event[key]);
      }
    }
    // We don't want passwords in our session vars
    this._setReactiveVar('password', event.password);
  },

  _observeSignupState() {
    let signup = this.signupStore.signup();
    if (signup && signup.error && !this.signupStore.isSigningUp()) {
      this._setReactiveVar('error', signup.error.message);
    } else {
      this._setReactiveVar('error', null);
    }
  }

});
