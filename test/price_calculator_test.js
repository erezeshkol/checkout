const assert = require('assert');

import CalculatePrice from '../app/price_calculator.js';

describe('Price calculator', function() {
  describe('CalculatePrice', function() {
    it("should return correct price when there's no discount", function() {
      const items = [
        {id: 'A', price: 100}
      ];
      assert.deepEqual(CalculatePrice(items, {'A': 3}), {price: 300, discount: 0});
    });
    it("should return correct price for multiple items with no discounts", function() {
      const items = [
        {id: 'A', price: 100}, {id: 'B', price: 50}
      ];
      assert.deepEqual(CalculatePrice(items, {'A': 3, 'B': 8}), {price: 700, discount: 0});
    });
    it("should return correct price when there's a discount", function() {
      const items = [
        {id: 'A', price: 100, discount: {amount: 3, price: 250}}
      ];
      assert.deepEqual(CalculatePrice(items, {'A': 4}), {price: 400, discount: 50});
    });
    it("should only apply discount once", function() {
      const items = [
        {id: 'A', price: 100, discount: {amount: 3, price: 250}}
      ];
      assert.deepEqual(CalculatePrice(items, {'A': 100}), {price: 100*100, discount: 50});
    });
    it("should return correct price for multiple items with discounts", function() {
      const items = [
        {id: 'A', price: 100, discount: {amount: 3, price: 250}},
        {id: 'B', price: 50, discount: {amount: 2, price: 75}},
      ];
      assert.deepEqual(CalculatePrice(items, {'A': 3, 'B': 2}), {price: 400, discount: 75});
    });
    it("should return correct price for multiple items some have discounts and some don't", function() {
      const items = [
        {id: 'A', price: 100, discount: {amount: 3, price: 250}},
        {id: 'B', price: 50, discount: {amount: 2, price: 75}},
        {id: 'C', price: 20}
      ];
      assert.deepEqual(CalculatePrice(items, {'A': 8, 'B': 5, 'C': 10}), {price: 100*8+50*5+20*10, discount: 75});
    });
    it("should throw when cart contains item not in items db", function() {
      assert.throws(() => CalculatePrice([], {'A': 1}));
    });
  });
});
