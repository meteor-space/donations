Space.messaging.define(Space.messaging.Event, 'Donations', {

  RouteRequested: { routeName: String, params: Match.Optional(Object) },
  RouteTriggered: { routeName: String, params: Match.Optional(Object) },

});
