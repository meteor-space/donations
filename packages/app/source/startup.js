Meteor.startup(function() {
  Donations.app = new Donations.App();
  Donations.app.start();
  FlowRouter.initialize();
});
