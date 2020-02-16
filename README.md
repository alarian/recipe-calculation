# recipe-calculation

[![Build Status](https://img.shields.io/travis/gw2efficiency/recipe-calculation.svg?style=flat-square)](https://travis-ci.org/gw2efficiency/recipe-calculation)
[![Coverage Status](https://img.shields.io/codecov/c/github/gw2efficiency/recipe-calculation/master.svg?style=flat-square)](https://codecov.io/github/gw2efficiency/recipe-calculation)

> Calculate the cheapest tree traversal, price and used items of crafting recipes.

*This is part of [gw2efficiency](https://gw2efficiency.com). Please report all issues in [the central repository](https://github.com/gw2efficiency/issues/issues).*

## Install

```
npm install gw2e-recipe-calculation
```

This module can be used for Node.js as well as browsers using [Browserify](https://github.com/substack/browserify-handbook#how-node_modules-works). Be aware that you will probably
want to use [`gw2e-recipe-nesting`](https://github.com/gw2efficiency/recipe-nesting) with this.

## Usage

### Calculate the cheapest tree

```js
import {cheapestTree} from 'gw2e-recipe-calculation'

// How many times do we want to craft this item
// Note: If you want to craft a item 5 times and the output of the
// recipe is 5, it will calculate 1 craft if you pass in amount = 5
let amount = 1

// A nested recipe tree, as generated from "gw2e-recipe-nesting"
let recipeTree = {
  id: 13243,
  quantity: 5,
  output: 1,
  components: [/* ... */]
}

// The item prices, as a map of item id => price
let itemPrices = {1: 123, 2: 42, 3: 1337}

// (Optional) The available items, e.g. from the material storage, bank and characters
let availableItems = {1: 1, 2: 250, 3: 5}

// (Optional) A list of item ids for which crafting is *disabled* when generating the
// cheapest tree (e.g. for excluding precursor crafting or daily cooldowns)
let craftingDisabled = [1337, 42]

// Calculate!
let tree = cheapestTree(amount, recipeTree, itemPrices, availableItems, craftingDisabled)

// The tree now looks like this:
{
  id: 13243,
  quantity: 5,
  output: 1,
  components: [/* ... */],
  
  // The following keys get set for the top level and all sub-components:
  
  // The total quantity of this component
  totalQuantity: 5,
  
  // The total used quantity of this component. This is after
  // subtracting the available items of the user. If this is 0
  // then the user owns all items already.
  usedQuantity: 5,
  
  // The flag if the component should be crafted ("true") or bought ("false")
  craft: true,
  
  // Total buy price of the component
  buyPrice: 50,
  
  // Buy price for one of the components
  buyPriceEach: 10,
  
  // Total price to craft this component
  craftPrice: 42
}

// To only get the craft price of the item:
let craftPrice = tree.craftPrice
```

### Update tree quantites & prices

If you want to update the tree, because the `amount`, `availableItems` or `itemPrices` changed
or the user flipped a `craft` flag, you should use this method. This updates the following keys: `totalQuantity`, 
`usedQuantity`, `buyPrice`, `buyPriceEach` and `craftPrice`

**This method does not change any `craft` flags (= uses the
precalculated best tree). If you want to recalculate the cheapest tree, just use `cheapestTree` again!**

```js
import {updateTree} from 'gw2e-recipe-calculation'

// How many times do we want to craft this item
let amount = 1

// The already calculated tree (from "cheapestTree") that got changed
let calculatedTree = {/* ... */}

// The item prices, as a map of item id => price
let itemPrices = {1: 123, 2: 42, 3: 1337}

// (Optional) The available items, e.g. from the material storage, bank and characters
let availableItems = {1: 1, 2: 250, 3: 5}

// Update!
let updatedTree = updateTree(amount, calculatedTree, itemPrices, availableItems)
```

### Generate list of items to buy & used available items

```js
import {usedItems} from 'gw2e-recipe-calculation'

// Get all item ids of a calculated recipe tree (after "cheapestTree")
let tree = {/* ... */}
let usedItems = usedItems(tree)

// Generates a object with maps of id => count:
{
  buy: {1: 5, 3: 10, /* ... */},
  available: {1: 10, 2: 5, /* ... */}
}
```

### Generate list of crafting steps

```js
import {craftingSteps} from 'gw2e-recipe-calculation'

// Get the crafting steps of a calculated recipe tree (after "cheapestTree")
let tree = {/* ... */}
let craftingSteps = craftingSteps(tree)

// Generates an array with the crafting steps in correct order
[
  {
    id: 1,
    quantity: 10,
    components: [
      {id: 2, quantity: 20},
      {id: 3, quantity: 10}
    ]
  },
  // ...
]
```

### Static content

```js
import {staticItems} from 'gw2e-recipe-calculation'

// Get all item ids of items that can only be crafted once a day
let dailyCooldowns = staticItems.dailyCooldowns
// -> [1, 2, 3, 4]

// Get all item ids of items that can be bought, where the item or the immediate component 
// (e.g. Deldrimor Steel Ingot-> Lump of Mithrillium) is a daily cooldown
let buyableDailyCooldowns = staticItems.buyableDailyCooldowns
// -> [1, 2, 3, 4]

// Get an object with item ids as keys of all vendor-buyable items
let vendorItems = staticItems.vendorItems
// Returns an object like this:
{
  20798: {
    type: 'spirit-shard', // can be gold, spirit shards, karma or dungeon currency
    quantity: 1, // quantity the vendor sells
    cost: 1, // copper the vendor sells the quantity for
    npcs: [
      {name: 'Miyani / Mystic Forge Attendant', position: 'Mystic Forge'}
    ]
  },
  // ...
}
```

### Helpers

```js
import {recipeItems, dailyCooldowns, useVendorPrices} from 'gw2e-recipe-calculation'

// Get all item ids of a recipe tree (before or after "cheapestTree")
let recipeTree = {/* ... */}
let ids = recipeItems(recipeTree)
// -> [1, 2, 3, 4]

// Get a list of all needed daily cooldowns (after "cheapestTree")
let recipeTree = {/* ... */}
let ids = dailyCooldowns(recipeTree)
// -> {46740: 3, 66913: 4}

// Overwrite and add all vendor prices to a price array
// To show the users more information afterwards use "staticItems.vendorItems"
let prices = {1: 1233, 19750: 50000}
prices = useVendorPrices(prices)
// -> {1: 1233, 19750: 16, 19924: 48, /* ... */}
```

## Tests

```
npm test
```

## Licence

MIT
