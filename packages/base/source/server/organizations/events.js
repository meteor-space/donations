Space.messaging.define(Space.domain.Event, `Donations`, {

  OrgRegistrationInitiated: {
    adminId: Guid,
    organizationId: Guid,
    name: String,
    country: Country,
    contact: Donations.Contact,
    password: Password
  },

  OrgRegistrationApproved: {},

  OrgRegistrationRetried: {
    name: String,
    country: Country,
    contact: Donations.Contact,
    password: Password
  },

  OrgAdminSignedUp: {
    adminId: Guid
  },

  OrgRegistrationFailed: {
    stage: Match.OneOf('adminSignupFailed', 'orgCreationFailed'),
    error: Object
  },

  OrgRegistrationCompleted: {},

  OrganizationCreated: {
    adminId: Guid,
    name: String,
    country: Country,
    contact: Donations.Contact
  },

  LocationAdded: {
    name: String,
    locationId: Guid,
    address: Donations.Address,
    openingHours: String
  },

  LocationDetailsChanged: {
    name: String,
    locationId: Guid,
    address: Donations.Address,
    openingHours: String
  }

});
