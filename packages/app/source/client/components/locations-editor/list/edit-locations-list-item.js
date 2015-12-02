Space.flux.BlazeComponent.extend(Donations, 'EditLocationsListItem', {

  reactiveVars() {
    return [{
      isEditing: false
    }];
  },

  events() {
    return [{
      'click .name': this._onNameClicked,
      'click .edit': this._onEditClicked,
      'click .location.form .submit': this._onSaveClicked
    }];
  },

  _onNameClicked() {
    event.preventDefault();
    if (!this.isEditing()) {
      this.publish(new Donations.RouteRequested({
        routeName: 'locationAdmin',
        params: {
          id: this.data()._id
        }
      }));
    }
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
