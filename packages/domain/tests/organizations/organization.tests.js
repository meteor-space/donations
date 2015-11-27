describe(`Donations.Organization`, function() {

  beforeEach(function() {
    this.data = {
      adminId: new Guid(),
      name: `MyOrg`,
      country: new Country(`AT`),
      contact: new Donations.Contact({
        name: `Dominik Guzei`,
        email: new EmailAddress(`dominik@example.com`),
        phone: `+43 4493 454`
      })
    };
  });

  describe(`creating a new organization`, function() {

    it(`publishes a created event`, function() {
      let guid = new Guid();
      Donations.domain.test(Donations.Organization).given()
      .when(
        new Donations.CreateOrganization(_.extend({}, this.data, {
          targetId: guid
        }))
      )
      .expect([
        new Donations.OrganizationCreated(_.extend({}, this.data, {
          sourceId: guid,
          timestamp: new Date(),
          version: 1
        }))
      ]);

    });
  });
});
