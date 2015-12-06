Space.flux.BlazeComponent.extend(Donations, 'AppealForm', {

  ENTER: 13,

  events() {
    return [{
      'keyup .appeal.form input': this._onInputChange,
      'keyup .appeal.form .description': this._onInputChange,
      'click .appeal.form .submit': this._onSubmit
    }];
  },

  _onInputChange() {
    if (event.keyCode === this.ENTER) {
      this._onSubmit()
    }
  },
  _onSubmit() {},

  _getValues() {
    return {
      title: this.$('.title').val(),
      quantity: new Quantity(parseInt(this.$('.quantity').val(), 10)),
      description: this.$('.description').val()
    };
  }
});
