Space.ui.BlazeComponent.extend('Donations.OpenAppealsPage', {

  dependencies: {
    store: 'Donations.OpenAppealsStore'
  },

  appeals() {
    return this.store.appeals.find()
  }

});

Donations.OpenAppealsPage.register('open_appeals_page');
