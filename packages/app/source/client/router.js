// Don't start routing immediately -> we need to do that when our app starts!
FlowRouter.wait();

// Generates flow-router routes + generalized action that publishes events
let generate = function(routeName) {
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

// INDEX
FlowRouter.route('/', generate('landingPage'));
