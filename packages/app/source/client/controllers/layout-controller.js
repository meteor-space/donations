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
        case 'register': this._renderOrgRegistrationForm(); break;
        case 'orgAdmin': this._renderOrgAdminPage(); break;
        default: this._renderLandingPage();
        }
      }
    }];
  },

  _renderLandingPage() {
    this._render("standard_layout", { main: "landing_page" });
  },

  _renderOrgRegistrationForm() {
    this._render("standard_layout", { main: "register_page" });
  },

  _renderOrgAdminPage() {
    this._render("standard_layout", { main: "org_admin_page" });
  },

  _render(layout, sections) {
    this._currentLayout = layout;
    this._.extend(this._currentSections, sections);
    this.layout.render(this._currentLayout, this._currentSections);
  },

  _updateSections(sections) {
    this._render(this._currentLayout, sections);
  }

});

Donations.LayoutController.mixin([
  Space.messaging.EventSubscribing
]);
