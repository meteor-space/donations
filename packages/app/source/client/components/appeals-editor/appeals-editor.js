Space.flux.BlazeComponent.extend('Donations.AppealsEditor', {

  dependencies: {
    locationDetailsStore: 'Donations.LocationDetailsStore'
  },

  appeals() {
    return this.locationDetailsStore.appeals();
  }

});

Donations.AppealsEditor.register('appeals_editor');
