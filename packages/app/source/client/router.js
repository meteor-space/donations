// Don't start routing immediately -> we need to do that when our app starts!
FlowRouter.wait();

// Generates flow-router routes + generalized action that publishes events
let generateRoute = function(routeName) {
  return {
    name: routeName,
    action(params) {
      // Merge query into params
      let mergedParams = _.extend({}, params, params.query);
      // Cleanup params/query abstraction
      delete mergedParams.query;
      Donations.app.publish(new Donations.RouteTriggered({
        routeName: routeName,
        params: mergedParams
      }));
    }
  };
};

FlowRouter.route('/', generateRoute('landingPage'));
FlowRouter.route('/open-appeals', generateRoute('openAppeals'));
FlowRouter.route('/login', generateRoute('login'));
FlowRouter.route('/register', generateRoute('register'));
FlowRouter.route('/org/:id/admin', generateRoute('orgAdmin'));
FlowRouter.route('/location/:id/admin', generateRoute('locationAdmin'));
