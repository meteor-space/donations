Space.domain.ValueObject.extend(Donations, `Address`, {
  // EJSON serializable fields
  fields() {
    return {
      country: Country,
      zip: String,
      city: String,
      street: String
    };
  }
});
