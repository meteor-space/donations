describe(`Donations.Api`, function () {

  it(`receives a command and sends it on the server-side command bus when valid`, function () {
    let myCommand = new Donations.CreateOrganization({
      targetId: new Guid(),
      version: 1,
      name: `MyOrg`,
      country: new Country(`AT`),
      contact: new Donations.Contact({
        name: `Dominik Guzei`,
        email: new EmailAddress(`dominik@example.com`),
        phone: `+43 4493 454`
      })
    });
    Donations.App.test(Donations.OrganizationApi)
    .send(myCommand).expect([myCommand])
  });

});
