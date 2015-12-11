Space.flux.BlazeComponent.extend(Donations, 'EditAppealsListItem', {

  is(state) {
    return this.data().state === state;
  },

  reactiveVars() {
    return [{
      isEditing: false,
      isShowingPledges: false
    }];
  },

  events() {
    return [{
      'click .edit': this._onEditClicked,
      'click .make': this._onMakeClicked,
      'click .appeal.form .submit': this._onSaveClicked,
      'click .pledge-list-toggle': this._onPledgeListToggleClicked
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
  },

  _onPledgeListToggleClicked() {
    this._setReactiveVar('isShowingPledges', !this.isShowingPledges());
  }

});

Donations.EditAppealsListItem.register('edit_appeals_list_item');
