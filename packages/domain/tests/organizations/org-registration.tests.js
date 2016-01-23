describe('Donations.OrgRegistration', function() {

  beforeEach(function() {
    Meteor.users.remove({});
    this.processId = new Guid();
    this.data = {
      name: 'MyOrg',
      country: new Country('AT'),
      contact: new Donations.Contact({
        name: 'Dominik Guzei',
        email: new EmailAddress('dominik@example.com'),
        phone: `+43 4493 454`
      }),
      password: new Password('1234')
    };
  });

  describe('registering an organization', function() {

    it('signs up an admin and creates the organization', function() {
      Donations.domain.test(Donations.OrgRegistration).given()
        .when(
          new Donations.RegisterOrganization(_.extend({}, this.data, {
            targetId: this.processId
          }))
        )
        .expect([
          new Donations.OrgRegistrationInitiated(_.extend({}, this.data, {
            sourceId: this.processId,
            adminId: Guid,
            organizationId: Guid
          })),
          new Donations.OrgRegistrationApproved({ sourceId: this.processId }),
          new Space.accounts.SignupSuccessful({ userId: Guid }),
          new Donations.OrgAdminSignedUp({
            sourceId: this.processId,
            adminId: Guid
          }),
          new Donations.OrganizationCreated({
            sourceId: Guid,
            adminId: Guid,
            name: this.data.name,
            country: this.data.country,
            contact: this.data.contact
          }),
          new Donations.OrgRegistrationCompleted({ sourceId: this.processId })
        ]);

    });
  });
});
