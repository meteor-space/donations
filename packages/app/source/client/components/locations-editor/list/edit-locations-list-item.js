Space.flux.BlazeComponent.extend(Donations, 'EditLocationsListItem', {

  reactiveVars() {
    return [{
      isEditing: false
    }];
  },

  events() {
    return [{
      'click .edit': this._onEditClicked,
      'click .location.form .submit': this._onSaveClicked
    }];
  },

  _onEditClicked(event) {
    event.preventDefault();
    this._setReactiveVar('isEditing', true);
  },

  _onSaveClicked() {
    this._setReactiveVar('isEditing', false);
  }

});

Donations.EditLocationsListItem.register('edit_locations_list_item');
