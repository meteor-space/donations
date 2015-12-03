describe(`Donations.OrgRegistration`, function() {

  beforeEach(function() {
    this.data = {
      name: `MyOrg`,
      country: new Country(`AT`),
      contact: new Donations.Contact({
        name: `Dominik Guzei`,
        email: new EmailAddress(`dominik@example.com`),
        phone: `+43 4493 454`
      }),
      password: new Password('1234')
    };
  });

  describe(`creating a new organization`, function() {

    it(`publishes a created event`, function() {
      let processId = new Guid();
      Donations.domain.test(Donations.OrgRegistration).given()
        .when(
          new Donations.RegisterOrganization(_.extend({}, this.data, {
            targetId: processId
          }))
        )
        .expect(
          new Donations.OrgRegistrationInitiated(_.extend({}, this.data, {
            sourceId: processId,
            version: 1,
            timestamp: Date,
            adminId: Guid,
            organizationId: Guid,
          }))
        );

    });
  });
});
