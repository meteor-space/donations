Meteor.startup(function() {
  Donations.app = new Donations.App();
  Donations.app.start();
  FlowRouter.initialize();

  if (Meteor.isServer && process.env.NODE_ENV === 'development') {
    Donations.setupDevData();
  }
});
