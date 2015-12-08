Space.flux.BlazeComponent.extend(Donations, 'MakePledgeForm', {

  reactiveVars() {
    return [{
      error: null
    }];
  },

  events() {
    return [{
      'click .confirm': this._onConfirm
    }];
  },

  _onConfirm() {
    this._setReactiveVar('error', null);
    let values = this._getValues();
    if (this._validate(values)) {
      this.publish(new Donations.MakePledgeFormSubmitted(_.extend(values, {
        appealId: this.data().appeal._id
      })));
    }
  },

  _getValues() {
    return {
      quantity: this.$('.quantity').val(),
      donor: {
        name: this.$('.donor-name').val(),
        phone: this.$('.donor-phone').val(),
        email: this.$('.donor-email').val()
      }
    };
  },

  _validate(values) {
    let requiredQuantity = this.data().appeal.requiredQuantity;
    let quantity = values.quantity;
    let donor = values.donor;
    // Catch quantities that are not integers
    if (!this._isInteger(quantity)) {
      return this._setError(__('pledge.quantity_error', requiredQuantity));
    }
    try {
      values.quantity = new Quantity(parseInt(quantity, 10));
    } catch (e) {
      // Catch invalid quantities
      return this._setError(__('pledge.quantity_error', requiredQuantity));
    }
    // Don't allow to pledge more than required!
    if (values.quantity.isMore(requiredQuantity)) {
      return this._setError(__('pledge.quantity_error', requiredQuantity));
    }
    // Don't allow empty donor details
    if (this._isAnyEmpty(donor.name, donor.phone, donor.email)) {
      return this._setError(__('pledge.donor_details_error'));
    }
    // Ensure valid email address
    try {
      donor.email = new EmailAddress(donor.email);
    } catch (e) {
      return this._setError(__('pledge.donor_email_error'));
    }
    values.donor = new Donations.Contact(donor);
    return true;
  },

  _isInteger(value) {
    let parsed = parseFloat(value);
    return (typeof parsed === 'number' && (parsed % 1) === 0);
  },

  _isAnyEmpty() {
    for (let value of arguments) {
      if (value === '') return true;
    }
    return false;
  },

  _setError(message) {
    this._setReactiveVar('error', message);
    return false;
  }
});

Donations.MakePledgeForm.register('make_pledge_form');
