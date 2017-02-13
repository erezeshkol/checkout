var assert = require('assert');

import CalculatePrice from '../app/price_calculator.js';

describe('Price calculator', function() {
  describe('CalculatePrice', function() {
    it("should return correct price when there's no discount", function() {
      assert.equal(CalculatePrice([{id: 'A', price: 100}], {'A': 3}).price, 300);
    });
  });
});
