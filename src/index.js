import _cheapestTree from './cheapestTree.js'
import _updateTree from './updateTree.js'
import _usedItems from './usedItems.js'
import _craftingSteps from './craftingSteps.js'
import _recipeItems from './helpers/recipeItems.js'
import _dailyCooldowns from './helpers/dailyCooldowns.js'
import _useVendorPrices from './helpers/useVendorPrices.js'
import * as staticDailyCooldowns from './static/dailyCooldowns.js'
import vendorItems from './static/vendorItems.js'

const _staticItems = {
  dailyCooldowns: staticDailyCooldowns.dailyCooldowns,
  buyableDailyCooldowns: staticDailyCooldowns.buyableDailyCooldowns,
  vendorItems
}

export default {
  cheapestTree: _cheapestTree,
  updateTree: _updateTree,
  usedItems: _usedItems,
  craftingSteps: _craftingSteps,
  recipeItems: _recipeItems,
  dailyCooldowns: _dailyCooldowns,
  useVendorPrices: _useVendorPrices,
  staticItems: _staticItems
}

export const cheapestTree = _cheapestTree
export const updateTree = _updateTree
export const usedItems = _usedItems
export const craftingSteps = _craftingSteps
export const recipeItems = _recipeItems
export const dailyCooldowns = _dailyCooldowns
export const useVendorPrices = _useVendorPrices
export const staticItems = _staticItems
