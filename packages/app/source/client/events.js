Space.messaging.define(Space.messaging.Event, 'Donations', {

  // ======= Routing =======

  RouteRequested: { routeName: String, params: Match.Optional(Object) },
  RouteTriggered: { routeName: String, params: Match.Optional(Object) },

  // ======= OrgRegistration ========

  OrgRegistrationRequested: {
    name: String,
    country: Country,
    contact: Donations.Contact,
    password: Password
  },

  OrgRegistrationInputsChanged: {
    orgName: String,
    orgCountry: String,
    contactEmail: String,
    contactName: String,
    contactPhone: String,
    password: String
  },

  OrgRegistrationFormSubmitted: {}

});
