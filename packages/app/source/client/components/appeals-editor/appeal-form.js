Space.flux.BlazeComponent.extend(Donations, 'AppealForm', {

  events() {
    return [{
      'keyup .appeal.form input': this._onInputChange,
      'keyup .appeal.form .description': this._onInputChange,
      'click .appeal.form .submit': this._onSubmit
    }];
  },

  _onInputChange() {},
  _onSubmit() {},

  _getValues() {
    return {
      title: this.$('.title').val(),
      quantity: new Quantity(parseInt(this.$('.quantity').val(), 10)),
      description: this.$('.description').val()
    };
  }
});
