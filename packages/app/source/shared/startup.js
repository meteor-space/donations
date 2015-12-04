Meteor.startup(function() {
  Donations.app = new Donations.App();
  Donations.app.start();
  FlowRouter.initialize();

  if (Meteor.isServer) {
    // Configure force-ssl redirect URL
    Meteor.absoluteUrl.defaultOptions.rootUrl = 'https://www.sachspenden.online';
  }

  if (Meteor.isServer && process.env.NODE_ENV === 'development') {
    Donations.setupDevData();
  }
});
