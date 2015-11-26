Space.messaging.define(Space.messaging.Event, `Donations`, {

  // REGISTRATION

  OrgRegistrationInitiated: {
    adminId: Guid,
    organizationId: Guid,
    name: String,
    country: Country,
    contact: Donations.Contact,
    password: Password
  },

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

  // ORGANIZATIONS

  OrganizationCreated: {
    adminId: Guid,
    name: String,
    country: Country,
    contact: Donations.Contact
  },

  // LOCATIONS

  LocationAdded: {
    name: String,
    organizationId: Guid,
    address: Donations.Address,
    contact: Donations.Contact
  },

  // APPEALS

  AppealMade: {
    title: String,
    requiredQuantity: Quantity,
    organizationId: Guid,
    locationId: Guid,
    description: Match.Optional(String)
  },

  PledgeMade: {
    pledgeId: Guid,
    quantity: Quantity,
    donor: Donations.Contact
  },

  AppealFulfilled: {},

  PledgeAccepted: {
    pledgeId: Guid
  },

  PledgeFulfilled: {
    pledgeId: Guid
  }

});
