
let createExampleOrg = function() {

  if (Meteor.users.find({ username: process.env.EXAMPLE_ORG_EMAIL }).count() === 0) {

    Donations.app.send(new Donations.RegisterOrganization({
      targetId: new Guid(),
      name: 'My Example Organization',
      country: new Country('AT'),
      contact: new Donations.Contact({
        email: new EmailAddress(process.env.EXAMPLE_ORG_EMAIL),
        name: 'Dominik Guzei',
        phone: '+43 676 9222862'
      }),
      password: new Password(SHA256(process.env.EXAMPLE_ORG_PASSWORD))
    }));
  }
};

Donations.setupDevData = function() {
  createExampleOrg();
};
