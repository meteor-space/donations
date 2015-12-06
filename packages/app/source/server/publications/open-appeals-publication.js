Space.messaging.Publication.extend(Donations, 'OpenAppealsPublication', {

  dependencies: {
    appeals: 'Donations.OpenAppeals'
  },

  publications() {
    return [{
      'open-appeals'() {
        return this.appeals.find();
      }
    }];
  }

});
