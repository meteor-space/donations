describe('Donations.Appeal', function() {

  beforeEach(function() {

    // ========== TEST DATA ============
    this.appealId = new Guid();
    this.appealData = {
      title: 'My Appeal for item X',
      requiredQuantity: new Quantity(10),
      organizationId: new Guid(),
      locationId: new Guid(),
      description: 'My description for this appeal'
    };
    this.appealEventData = _.extend({}, this.appealData, {
      sourceId: this.appealId
    });
    this.pledgeData = {
      id: new Guid(),
      donor: new Donations.Contact({
        name: 'Dominik Guzei',
        email: new EmailAddress('dominik@example.com'),
        phone: `+43 4493 454`
      }),
      quantity: new Quantity(1)
    };
    this.pledgeEventData = _.extend({}, this.pledgeData, {
      sourceId: this.appealId
    });
  });

  let draftAppeal = function() {
    return [
      new Donations.AppealDrafted(this.appealEventData)
    ];
  };

  let openAppeal = function() {
    return [
      new Donations.AppealDrafted(this.appealEventData),
      new Donations.AppealMade(this.appealEventData)
    ];
  };

  let fulfilledAppeal = function() {
    return [
      new Donations.AppealDrafted(this.appealEventData),
      new Donations.AppealMade(this.appealEventData),
      new Donations.AppealFulfilled(this.appealEventData)
    ];
  };

  let closedAppeal = function() {
    return [
      new Donations.AppealDrafted(this.appealEventData),
      new Donations.AppealMade(this.appealEventData),
      new Donations.AppealClosed(this.appealEventData)
    ];
  };

  let appealWithPledgeMade = function() {
    return [
      new Donations.AppealDrafted(this.appealEventData),
      new Donations.AppealMade(this.appealEventData),
      new Donations.PledgeMade(this.pledgeEventData)
    ];
  };

  let appealWithAcceptedPledge = function() {
    return [
      new Donations.AppealDrafted(this.appealEventData),
      new Donations.AppealMade(this.appealEventData),
      new Donations.PledgeMade(this.pledgeEventData),
      new Donations.PledgeAccepted(this.pledgeEventData)
    ];
  };

  let appealWithFulfilledPledge = function() {
    return [
      new Donations.AppealDrafted(this.appealEventData),
      new Donations.AppealMade(this.appealEventData),
      new Donations.PledgeMade(this.pledgeEventData),
      new Donations.PledgeAccepted(this.pledgeEventData),
      new Donations.PledgeFulfilled(this.pledgeEventData)
    ];
  };

  describe('drafting an appeal', function() {

    it('publishes an appeal added event', function() {

      Donations.domain.test(Donations.Appeal)
        .given()
        .when([
          new Donations.DraftAppeal(_.extend({}, this.appealData, {
            targetId: this.appealId
          }))
        ])
        .expect([
          new Donations.AppealDrafted(this.appealEventData)
        ]);

    });

  });

  describe('updating an appeal draft', function() {

    it('publishes an appeal draft updated event', function() {

      Donations.domain.test(Donations.Appeal)
        .given([
          new Donations.AppealDrafted(this.appealEventData)
        ])
        .when([
          new Donations.UpdateAppealDraft({
            targetId: this.appealId,
            title: this.appealData.title,
            requiredQuantity: this.appealData.requiredQuantity,
            description: this.appealData.description
          })
        ])
        .expect([
          new Donations.AppealDraftUpdated({
            sourceId: this.appealId,
            title: this.appealData.title,
            requiredQuantity: this.appealData.requiredQuantity,
            description: this.appealData.description
          })
        ]);

    });

  });

  describe('making an appeal', function() {

    it('publishes an appeal made event', function() {

      Donations.domain.test(Donations.Appeal)
        .given(draftAppeal.call(this))
        .when([
          new Donations.MakeAppeal({ targetId: this.appealId })
        ])
        .expect([
          new Donations.AppealMade(this.appealEventData)
        ]);

    });

    it('only allows appeals to be made if currently a draft', function() {

      Donations.domain.test(Donations.Appeal)
        .given(openAppeal.call(this))
        .when(
          new Donations.MakeAppeal({ targetId: this.appealId })
        )
        .expect([
          new Space.domain.Exception({
            thrower: 'Donations.Appeal',
            error: new Donations.InvalidAppealState('Donations.MakeAppeal', 'open')
          })
        ]);

      Donations.domain.test(Donations.Appeal)
        .given(closedAppeal.call(this))
        .when(
          new Donations.MakeAppeal({ targetId: this.appealId })
        )
        .expect([
          new Space.domain.Exception({
            thrower: 'Donations.Appeal',
            error: new Donations.InvalidAppealState('Donations.MakeAppeal', 'closed')
          })
        ]);

    });

  });

  describe(`updating the title and/or description a public appeal`, function() {

    it('publishes an appeal updated event', function() {

      Donations.domain.test(Donations.Appeal)
        .given(openAppeal.call(this))
        .when([
          new Donations.UpdateAppeal({
            targetId: this.appealId,
            title: this.appealData.title,
            description: this.appealData.description
          })
        ])
        .expect([
          new Donations.AppealUpdated({
            sourceId: this.appealId,
            title: this.appealData.title,
            description: this.appealData.description
          })
        ]);

    });

  });

  describe('cancelling an appeal', function() {

    it('cancels a draft appeal', function() {

      Donations.domain.test(Donations.Appeal)
        .given(draftAppeal.call(this))
        .when([
          new Donations.CancelAppeal({ targetId: this.appealId })
        ])
        .expect([
          new Donations.AppealCancelled(this.appealEventData)
        ]);

    });

    it('does not allow cancelling of an open appeal', function() {

      Donations.domain.test(Donations.Appeal)
        .given(openAppeal.call(this))
        .when([
          new Donations.CancelAppeal({ targetId: this.appealId })
        ])
        .expect([
          new Space.domain.Exception({
            thrower: 'Donations.Appeal',
            error: new Donations.InvalidAppealState('Donations.CancelAppeal', 'open')
          })
        ]);

    });

  });

  describe('making pledges', function() {

    it('publishes a pledge made event', function() {

      Donations.domain.test(Donations.Appeal)
        .given(openAppeal.call(this))
        .when(
          new Donations.MakePledge(_.extend({}, this.pledgeData, {
            targetId: this.appealId
          }))
        )
        .expect([
          new Donations.PledgeMade(_.extend({}, this.pledgeData, {
            sourceId: this.appealId
          }))
        ]);

    });

    it('publishes appeal fulfilled event in addition when pledged quantity equals the required quantity', function() {

      let pledgeQuantity = this.appealData.requiredQuantity;

      Donations.domain.test(Donations.Appeal)
        .given(openAppeal.call(this))
        .when(
          new Donations.MakePledge(_.extend({}, this.pledgeData, {
            targetId: this.appealId,
            quantity: pledgeQuantity
          }))
        )
        .expect([
          new Donations.PledgeMade(_.extend({}, this.pledgeData, {
            sourceId: this.appealId,
            version: 2,
            quantity: pledgeQuantity,
            timestamp: Date
          })),
          new Donations.AppealFulfilled(_.extend({}, this.appealData, {
            sourceId: this.appealId,
            version: 2,
            timestamp: Date
          }))
        ]);

    });

    it(`caps new pledge quantity at the appeal's required quantity`, function() {

      let pledgeQuantity = this.appealData.requiredQuantity.add(1);

      Donations.domain.test(Donations.Appeal)
        .given(openAppeal.call(this))
        .when(
          new Donations.MakePledge(_.extend({}, this.pledgeData, {
            targetId: this.appealId,
            quantity: pledgeQuantity
          }))
        )
        .expect([
          new Donations.PledgeMade(_.extend({}, this.pledgeData, {
            sourceId: this.appealId,
            version: 2,
            quantity: this.appealData.requiredQuantity,
            timestamp: Date
          })),
          new Donations.AppealFulfilled(_.extend({}, this.appealData, {
            sourceId: this.appealId,
            version: 2,
            timestamp: Date
          }))
        ]);

    });

    it('only allows new pledges if appeal is open', function() {

      Donations.domain.test(Donations.Appeal)
        .given(fulfilledAppeal.call(this))
        .when(
          new Donations.MakePledge(_.extend({}, this.pledgeData, {
            targetId: this.appealId
          }))
        )
        .expect([
          new Space.domain.Exception({
            thrower: 'Donations.Appeal',
            error: new Donations.InvalidAppealState('Donations.MakePledge', 'fulfilled'),
            timestamp: Date
          })
        ]);

      Donations.domain.test(Donations.Appeal)
        .given(closedAppeal.call(this))
        .when(
          new Donations.MakePledge(_.extend({}, this.pledgeData, {
            targetId: this.appealId
          }))
        )
        .expect([
          new Space.domain.Exception({
            thrower: 'Donations.Appeal',
            error: new Donations.InvalidAppealState('Donations.MakePledge', 'closed'),
            timestamp: Date
          })
        ]);

    });

  });

  describe('managing pledges', function() {

    describe('accepting a pledge', function() {

      it("publishes pledge accepted event", function() {

        Donations.domain.test(Donations.Appeal)
          .given(appealWithPledgeMade.call(this))
          .when([
            new Donations.AcceptPledge({
              targetId: this.appealId,
              id: this.pledgeData.id
            })
          ])
          .expect([
            new Donations.PledgeAccepted(this.pledgeEventData)
          ]);

      });

      it('cannot be accepted if appeal has been fulfilled', function() {

        Donations.domain.test(Donations.Appeal)
          .given(fulfilledAppeal.call(this))
          .when([
            new Donations.AcceptPledge({
              targetId: this.appealId,
              id: this.pledgeData.id
            })
          ])
          .expect([
            new Space.domain.Exception({
              thrower: 'Donations.Appeal',
              error: new Donations.InvalidAppealState('Donations.AcceptPledge', 'fulfilled')
            })
          ]);

      });

    });

    describe('fulfilling a pledge', function() {

      it("publishes a pledge fulfilled event", function() {

        Donations.domain.test(Donations.Appeal)
        .given(appealWithAcceptedPledge.call(this))
        .when([
          new Donations.FulfillPledge({
            targetId: this.appealId,
            id: this.pledgeData.id
          })
        ])
        .expect([
          new Donations.PledgeFulfilled(this.pledgeEventData)
        ]);

      });

      it('cannot be fulfilled if not accepted', function() {

        Donations.domain.test(Donations.Appeal)
          .given(appealWithPledgeMade.call(this))
          .when([
            new Donations.FulfillPledge({
              targetId: this.appealId,
              id: this.pledgeData.id
            })
          ])
          .expect([
            new Space.domain.Exception({
              thrower: 'Donations.Appeal',
              error: new Donations.InvalidPledgeState('FulfillPledge', 'new')
            })
          ]);
      });

    });

    describe('declining a pledge', function() {

      it("publishes pledge declined event", function() {

        Donations.domain.test(Donations.Appeal)
          .given(appealWithPledgeMade.call(this))
          .when([
            new Donations.DeclinePledge({
              targetId: this.appealId,
              id: this.pledgeData.id
            })
          ])
          .expect([
            new Donations.PledgeDeclined(this.pledgeEventData)
          ]);

      });

      it('cannot decline if already fulfilled', function() {

        Donations.domain.test(Donations.Appeal)
          .given(appealWithFulfilledPledge.call(this))
          .when([
            new Donations.DeclinePledge({
              targetId: this.appealId,
              id: this.pledgeData.id
            })
          ])
          .expect([
            new Space.domain.Exception({
              thrower: 'Donations.Appeal',
              error: new Donations.InvalidPledgeState('DeclinePledge', 'fulfilled')
            })
          ]);

      });

    });

    describe('writing off pledges', function() {

      it("publishes pledge written off event", function() {

        Donations.domain.test(Donations.Appeal)
          .given(appealWithPledgeMade.call(this))
          .when([
            new Donations.WriteOffPledge({
              targetId: this.appealId,
              id: this.pledgeData.id
            })
          ])
          .expect([
            new Donations.PledgeWrittenOff(this.pledgeEventData)
          ]);

      });

      it('cannot write off if already fulfilled', function() {

        Donations.domain.test(Donations.Appeal)
          .given(appealWithFulfilledPledge.call(this))
          .when([
            new Donations.WriteOffPledge({
              targetId: this.appealId,
              id: this.pledgeData.id
            })
          ])
          .expect([
            new Space.domain.Exception({
              thrower: 'Donations.Appeal',
              error: new Donations.InvalidPledgeState('WriteOffPledge', 'fulfilled')
            })
          ]);

      });

    });

  });

  describe('closing an appeal', function() {

    it('closes an open appeal when commanded', function() {

      Donations.domain.test(Donations.Appeal)
        .given(openAppeal.call(this))
        .when(
          new Donations.CloseAppeal({
            targetId: this.appealId
          })
        )
        .expect([
          new Donations.AppealClosed(this.appealEventData)
        ]);

    });

    it('throws an error if commanded to close a fulfilled or presently closed appeal', function() {

      Donations.domain.test(Donations.Appeal)
        .given(fulfilledAppeal.call(this))
        .when(
          new Donations.CloseAppeal({ targetId: this.appealId })
        )
        .expect([
          new Space.domain.Exception({
            thrower: 'Donations.Appeal',
            error: new Donations.InvalidAppealState('Donations.CloseAppeal', 'fulfilled')
          })
        ]);

      Donations.domain.test(Donations.Appeal)
        .given(closedAppeal.call(this))
        .when(
          new Donations.CloseAppeal({ targetId: this.appealId })
        )
        .expect([
          new Space.domain.Exception({
            thrower: 'Donations.Appeal',
            error: new Donations.InvalidAppealState('Donations.CloseAppeal', 'closed')
          })
        ]);

    });

  });

});
