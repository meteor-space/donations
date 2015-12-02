Donations.AppealForm.extend(Donations, 'EditAppealForm', {

  appeal() {
    return this.data().appeal;
  },

  _onSubmit() {
    this.publish(new Donations.EditAppealDraftFormSubmitted(
      _.extend(this._getValues(), {
        appealId: this.appeal()._id
      })
    ));
  }

});

Donations.EditAppealForm.register('edit_appeal_form');
