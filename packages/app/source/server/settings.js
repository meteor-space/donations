// Setup settings for client based on environment vars
Meteor.settings.public.defaultLanguage = Space.getenv('DEFAULT_LANGUAGE', 'en');
