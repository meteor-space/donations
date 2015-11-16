Space.Object.extend(Donations, 'LayoutController', {

  dependencies: {
    layout: 'Layout',
    _: 'underscore'
  },

  Constructor() {
    this._currentLayout = null;
    this._currentSections = {};
  },

  eventSubscriptions() {
    return [{
      'Donations.RouteTriggered': function(event) {
        switch (event.routeName) {
        case 'landingPage':
          this.render("standard_layout", { main: "landing_page" });
          break;
        default:
        }
      }
    }];
  },

  render(layout, sections) {
    this._currentLayout = layout;
    this._.extend(this._currentSections, sections);
    this.layout.render(this._currentLayout, this._currentSections);
  },

  updateSections(sections) {
    this.render(this._currentLayout, sections);
  }

});

Donations.LayoutController.mixin([
  Space.messaging.EventSubscribing
]);
