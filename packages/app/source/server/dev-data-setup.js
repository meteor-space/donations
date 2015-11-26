
let createExampleOrg = function() {
  let byEmail = { 'emails.address': process.env.EXAMPLE_ORG_EMAIL };
  if (Meteor.users.find(byEmail).count() === 0) {

    Donations.app.send(new Donations.RegisterOrganization({
      targetId: new Guid(),
      name: 'My Example Organization',
      password: new Password(SHA256(process.env.EXAMPLE_ORG_PASSWORD)),
      country: new Country('AT'),
      contact: new Donations.Contact({
        email: new EmailAddress(process.env.EXAMPLE_ORG_EMAIL),
        name: 'Dominik Guzei',
        phone: '+43 676 9222862'
      })
    }));
  }
};

Donations.setupDevData = function() {
  createExampleOrg();
};
