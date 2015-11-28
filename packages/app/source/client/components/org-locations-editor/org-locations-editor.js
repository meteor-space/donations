Space.flux.BlazeComponent.extend(Donations, 'OrgLocationsEditor', {

  events() {
    return [{
      'click .add-location .submit'() {
        this.publish(new Donations.AddOrgLocationFormSubmitted({
          locationName: this.$('.add-location .name').val(),
          address: this.$('.add-location .address').val(),
          openingHours: this.$('.add-location .hours').val()
        }));
      }
    }];
  }
});

Donations.OrgLocationsEditor.register('org_locations_editor');
