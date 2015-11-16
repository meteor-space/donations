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

// Register as EJSON type
Donations.Address.type(`Donations.Address`);
