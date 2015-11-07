describe("Donations.Appeal", function () {

  beforeEach(function () {

    // ========== TEST DATA ============

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

    // ======== PREPARED DOMAIN EVENTS =========

    this.appealMade = new Donations.AppealMade(_.extend({}, this.appealData, {
      sourceId: this.appealId,
      version: 1
    }));
    this.fulfillingPledgeMade = new Donations.PledgeMade(_.extend({}, this.pledgeData, {
      sourceId: this.appealId,
      timestamp: new Date(),
      version: 2,
      quantity: this.appealData.requiredQuantity,
    }));
    this.appealFulfilled = new Donations.AppealFulfilled({
      sourceId: this.appealId,
      timestamp: new Date(),
      version: 2
    });

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
      .expect([this.appealMade]);
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
        .expect([this.fulfillingPledgeMade, this.appealFulfilled]);
      });

      it("does not allow additional pledges after fulfillment", function () {
        Donations.domain.test(Donations.Appeal)
        .given([
          this.appealMade, this.fulfillingPledgeMade, this.appealFulfilled
        ])
        .when(
          new Donations.MakePledge(_.extend({}, this.pledgeData, {
            targetId: this.appealId,
            quantity: new Quantity(1)
          }))
        )
        .expectToFailWith(new Donations.AppealIsAlreadyFulfilledError());
      });

    });
  });

});
