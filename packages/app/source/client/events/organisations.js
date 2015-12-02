Space.messaging.define(Space.messaging.Event, 'Donations', {

  // ======= REGISTRATION ========

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

  OrgRegistrationFormSubmitted: {},

  // ======== LOCATIONS ========

  AddOrgLocationFormSubmitted: {
    name: String,
    street: String,
    zip: String,
    city: String,
    country: String,
    openingHours: String
  },

  EditLocationFormSubmitted: {
    locationId: String,
    name: String,
    street: String,
    zip: String,
    city: String,
    country: String,
    openingHours: String
  }

});