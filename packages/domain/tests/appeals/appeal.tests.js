describe("Donations.Appeal", function () {

  beforeEach(function () {
    this.appealId = new Guid();
    this.pledgeId = new Guid();
    this.appealData = {
      title: 'My Appeal for item X',
      requiredQuantity: new Quantity(10),
      organizationId: new Guid(),
      locationId: new Guid(),
      description: 'My description for this appeal'
    };
    this.pledgeData = {
      pledgeId: this.pledgeId,
      donor: new Donations.Contact({
        name: 'Dominik Guzei',
        email: new EmailAddress('dominik@example.com'),
        phone: '+43 4493 454'
      })
    };
    this.appealMade = new Donations.AppealMade(_.extend({}, this.appealData, {
      sourceId: this.appealId,
      version: 1
    }));
  });

  describe("adding an appeal to a org location", function () {

    it("publishes an appeal added event", function () {
      Donations.domain.test(Donations.Appeal)
      .given()
      .when(
        new Donations.MakeAppeal(_.extend({}, this.appealData, {
          targetId: this.appealId
        }))
      )
      .expect([
        new Donations.AppealMade(_.extend({}, this.appealData, {
          sourceId: this.appealId,
          timestamp: new Date(),
          version: 1
        }))
      ]);
    });

  });

  describe("making pledges for an appeal", function () {

    describe("Scenario: partially fulfilling an appeal", function () {

      it("publishes events about the pledge made", function () {
        Donations.domain.test(Donations.Appeal)
        .given([this.appealMade])
        .when(
          new Donations.MakePledge(_.extend({}, this.pledgeData, {
            targetId: this.appealId,
            quantity: new Quantity(1)
          }))
        )
        .expect([
          new Donations.PledgeMade(_.extend({}, this.pledgeData, {
            sourceId: this.appealId,
            timestamp: new Date(),
            version: 2,
            quantity: new Quantity(1),
          })),
        ]);
      });

    });

    describe("Scenario: fulfilling an appeal", function () {

      it("publishes events about the pledge and fulfilled appeal", function () {
        Donations.domain.test(Donations.Appeal)
        .given([this.appealMade])
        .when(
          new Donations.MakePledge(_.extend({}, this.pledgeData, {
            targetId: this.appealId,
            quantity: this.appealData.requiredQuantity
          }))
        )
        .expect([
          new Donations.PledgeMade(_.extend({}, this.pledgeData, {
            sourceId: this.appealId,
            timestamp: new Date(),
            version: 2,
            quantity: this.appealData.requiredQuantity,
          })),
          new Donations.AppealFulfilled({
            sourceId: this.appealId,
            timestamp: new Date(),
            version: 2
          })
        ]);
      });
    });
  });

});
