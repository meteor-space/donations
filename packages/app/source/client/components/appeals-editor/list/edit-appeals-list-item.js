Space.flux.BlazeComponent.extend(Donations, 'EditAppealsListItem', {

  reactiveVars() {
    return [{
      isEditing: false
    }];
  },

  events() {
    return [{
      'click .edit': this._onEditClicked,
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

  _onSaveClicked() {
    this._setReactiveVar('isEditing', false);
  }

});

Donations.EditAppealsListItem.register('edit_appeals_list_item');
