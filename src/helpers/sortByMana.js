import resolveCardForLevel from './resolveCardForLevel'

export default (a, b) => {
  if (!a) return +1
  if (!b) return -1

  const cardA = resolveCardForLevel({
    token: a.token,
    id: a.id,
    level: a.level
  })
  const cardB = resolveCardForLevel({
    token: b.token,
    id: b.id,
    level: b.level
  })

  if (+cardA.mana > +cardB.mana) return +1
  if (+cardA.mana < +cardB.mana) return -1

  if (cardA.name > cardB.name) return +1
  if (cardA.name < cardB.name) return -1
}
