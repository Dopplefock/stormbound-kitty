import { RARITY_COPIES, UPGRADE_COST } from '../constants/game'

const getCostForLevel = target => ({ rarity, level, copies }) => {
  const conf = RARITY_COPIES[rarity]

  if (target === 1)
    return {
      coins: 0,
      stones: conf.stonesForMissing,
      copies: 1,
      extraCopies: 0
    }

  if (level === 5) return { coins: 0, stones: 0, copies: 0, extraCopies: 0 }

  let coins = 0
  let stones = 0
  let missingCopies = 0
  let availableCopies = copies

  for (let l = level; l < target; l += 1) {
    const requiredCopies = conf.copies[l - 1]
    const requiredCoins = UPGRADE_COST[l - 1]

    if (availableCopies >= requiredCopies) {
      stones += 0
      coins += requiredCoins
      availableCopies -= requiredCopies
      missingCopies += 0
    } else {
      stones += conf.stonesPerMissingCopy * (requiredCopies - availableCopies)
      coins += requiredCoins
      missingCopies += requiredCopies - availableCopies
      availableCopies = 0
    }
  }

  return { coins, stones, copies: missingCopies, extraCopies: availableCopies }
}

export default getCostForLevel
