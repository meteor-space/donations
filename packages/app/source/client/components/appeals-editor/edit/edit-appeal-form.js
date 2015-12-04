Donations.AppealForm.extend(Donations, 'EditAppealForm', {

  appeal() {
    return this.data().appeal;
  },

  _onSubmit() {
    if(this.appeal().state === 'draft') {
      this.publish(new Donations.EditAppealDraftFormSubmitted(
        _.extend(this._getValues(), {
          appealId: this.appeal()._id
        })
      ));
    } else if(this.appeal().state === 'open') {
      this.publish(new Donations.EditAppealFormSubmitted(
        _.extend(_.omit(this._getValues(), 'quantity'), {
          appealId: this.appeal()._id
        })
      ));
    }
  }

});

Donations.EditAppealForm.register('edit_appeal_form');
