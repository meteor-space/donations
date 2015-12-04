Space.flux.BlazeComponent.extend(Donations, 'EditAppealsListItem', {

  isMade() {
    return this.data().state === 'made';
  },

  reactiveVars() {
    return [{
      isEditing: false
    }];
  },

  events() {
    return [{
      'click .edit': this._onEditClicked,
      'click .make': this._onMakeClicked,
      'click .appeal.form .submit': this._onSaveClicked
    }];
  },

  stateClass() {
    return this.isEditing() ? 'is-editing' : 'is-viewing';
  },

  _onEditClicked(event) {
    event.preventDefault();
    this._setReactiveVar('isEditing', true);
  },

  _onMakeClicked(event) {
    event.preventDefault();
    this.publish(new Donations.AppealMade({ appealId: this.data()._id }));
  },

  _onSaveClicked() {
    this._setReactiveVar('isEditing', false);
  }

});

Donations.EditAppealsListItem.register('edit_appeals_list_item');
