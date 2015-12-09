Space.flux.BlazeComponent.extend(Donations, 'EditLocationsListItem', {

  reactiveVars() {
    return [{
      isEditing: false
    }];
  },

  events() {
    return [{
      'click .details': this._onAppealsListRequested,
      'click .edit': this._onEditClicked,
      'click .location.form .submit': this._onSaveClicked
    }];
  },

  _onAppealsListRequested() {
    if (!this.isEditing()) {
      this.publish(new Donations.RouteRequested({
        routeName: 'locationAdmin',
        params: {
          id: this.data()._id
        }
      }));
    }
  },

  _onEditClicked() {
    this._setReactiveVar('isEditing', true);
  },

  _onSaveClicked() {
    this._setReactiveVar('isEditing', false);
  }

});

Donations.EditLocationsListItem.register('edit_locations_list_item');
