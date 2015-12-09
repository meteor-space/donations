Space.flux.BlazeComponent.extend(Donations, 'AppealForm', {

  ENTER: 13,

  onRendered() {
    this.$('.description').trigger('autoresize');
  },

  events() {
    return [{
      'keyup .appeal.form input': this._onInputChange,
      'keyup .appeal.form .description': this._onInputChange,
      'click .appeal.form .submit': this._onSubmit
    }];
  },

  _onSubmit() {}, // To override in subclasses

  _onInputChange() {
    if (event.keyCode === this.ENTER) this._onSubmit();
  },

  _getValues() {
    return {
      title: this.$('.title').val(),
      quantity: this.$('.quantity').val(),
      description: this.$('.description').val()
    };
  }
});
