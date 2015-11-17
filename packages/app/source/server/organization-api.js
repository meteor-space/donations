Donations.OrganizationApi = Space.messaging.Api.extend(Donations, 'OrganizationApi', {

  dependencies: {
    meteor: 'Meteor'
  },

  methods() {
    return [{
      'Donations.CreateOrganization': function (context, command) {
        if(!context && !context.userId)
          throw new this.meteor.Error('You must be logged in to create organizations.')

        this.commandBus.send(command)
      }
    }]
  }

});
