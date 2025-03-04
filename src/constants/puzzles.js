export const RESTRICTIONS = {
  LEVEL_1: {
    name: 'Level 1',
    description: 'All cards are level 1.'
  },
  LEVEL_5: {
    name: 'Level 5',
    description: 'All cards are level 5.'
  },
  RNG_FRIENDLY: {
    name: 'RNG-friendly',
    description: 'All RNG goes in your favour.'
  },
  ANTI_RNG: {
    name: 'Anti-RNG',
    description:
      'Nothing goes right without {100%} precision! Leave no room for chance.'
  },
  PRESET: {
    name: 'Preset',
    description: 'Only cards and levels shown from the given deck can be used.'
  },
  DETAILED: {
    name: 'Detailed',
    description: 'Open the link and tap on things for more info about levels.'
  },
  FACTION: {
    name: 'Faction',
    description:
      'Only cards from one specific faction and neutral cards are allowed for the player.'
  },
  CUSTOM_BOARD: {
    name: 'Custom board',
    description:
      'The board can be in any state the restrictions allow it to be.'
  }
}

export const TYPES = {
  LETHAL: 'Destroy the enemy base this turn.',
  SURVIVE: 'Make sure your base survives until the next turn.',
  BASELOCK: 'Fill up all tiles on the enemy’s base line.',
  BOARDCLEAR: 'Kill all enemy units and structures.',
  VIP:
    'Make sure a specific unit or structure survives after you press "End Turn".',
  TARGET: 'Destroy a specific unit or structure.'
}
