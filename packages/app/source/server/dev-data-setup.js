let env = Space.getenv.multi({
  password: ['EXAMPLE_ORG_PASSWORD', '1234', 'string'],
  email: ['EXAMPLE_ORG_EMAIL', 'example@email.com', 'string']
});

let createExampleOrg = function() {
  let byEmail = { 'emails.address': env.email };
  if (Meteor.users.find(byEmail).count() === 0) {

    Donations.app.send(new Donations.RegisterOrganization({
      targetId: new Guid(),
      name: 'My Example Organization',
      password: new Password(SHA256(env.password)),
      country: new Country('AT'),
      contact: new Donations.Contact({
        email: new EmailAddress(env.email),
        name: 'Dominik Guzei',
        phone: '+43 676 9222862'
      })
    }));
  }
};

Donations.setupDevData = function() {
  createExampleOrg();
};
