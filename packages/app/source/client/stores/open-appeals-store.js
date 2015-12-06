Space.flux.Store.extend(Donations, 'OpenAppealsStore', {

  dependencies: {
    appeals: 'Donations.OpenAppeals'
  },

  onDependenciesReady() {
    this.meteor.subscribe('open-appeals');
  }

});
