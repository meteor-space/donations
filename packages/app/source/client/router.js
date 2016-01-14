// Don't start routing immediately -> we need to do that when our app starts!
FlowRouter.wait();

// Generates flow-router routes + generalized action that publishes events
const generateRoute = function(routeName) {
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

const authenticatedRedirect = () => {
  if ( !Meteor.loggingIn() && !Meteor.userId() ) {
    FlowRouter.go( 'login' );
  }
};

const publicRoutes = FlowRouter.group({
  name: 'public'
});

const authenticatedRoutes = FlowRouter.group({
  name: 'authenticated',
  triggersEnter: [ authenticatedRedirect ]
});

// Public routes
publicRoutes.route('/', generateRoute('landingPage'));
publicRoutes.route('/open-appeals', generateRoute('openAppeals'));
publicRoutes.route('/login', generateRoute('login'));
publicRoutes.route('/register', generateRoute('register'));

// Protected routes
authenticatedRoutes.route('/org/:id/admin', generateRoute('orgAdmin'));
authenticatedRoutes.route('/location/:id/admin', generateRoute('locationAdmin'));
