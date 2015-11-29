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
    openingHours: String
  },

  LocationDetailsChanged: {
    name: String,
    address: Donations.Address,
    openingHours: String
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
    id: Guid,
    donor: Donations.Contact,
    quantity: Quantity
  },

  AppealFulfilled: {
    title: String,
    requiredQuantity: Quantity,
    organizationId: Guid,
    locationId: Guid,
    description: Match.Optional(String)
  },

  PledgeAccepted: {
    id: Guid,
    donor: Donations.Contact,
    quantity: Quantity
  },

  PledgeDeclined: {
    id: Guid,
    donor: Donations.Contact,
    quantity: Quantity
  },

  PledgeFulfilled: {
    id: Guid,
    donor: Donations.Contact,
    quantity: Quantity
  },

  PledgeWrittenOff: {
    id: Guid,
    donor: Donations.Contact,
    quantity: Quantity
  },

  AppealClosed: {
    title: String,
    requiredQuantity: Quantity,
    organizationId: Guid,
    locationId: Guid,
    description: Match.Optional(String)
  }

});
