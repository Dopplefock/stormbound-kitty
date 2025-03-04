import React from 'react'
import getRawCardData from '../../helpers/getRawCardData'
import unfoldValue from '../../helpers/unfoldValue'
import { DEFAULT_CELL } from '../../constants/battle'
import CTA from '../CTA'
import CardSelect from '../CardSelect'
import Checkbox from '../Checkbox'
import Radio from '../Radio'
import Row from '../Row'
import Column from '../Column'
import './index.css'

const getActiveCellCard = ({ board, activeCell }) =>
  activeCell ? board[activeCell[0]][activeCell[1]] : { ...DEFAULT_CELL }

const BSCellForm = props => {
  const activeCellCard = getActiveCellCard(props)
  const [strength, setStrength] = React.useState(activeCellCard.strength || 1)
  const [level, setLevel] = React.useState(activeCellCard.level || 1)
  const [poisoned, setPoisoned] = React.useState(
    activeCellCard.card.type !== 'structure' ? activeCellCard.poisoned : false
  )
  const [frozen, setFrozen] = React.useState(
    activeCellCard.card.type !== 'structure' ? activeCellCard.frozen : false
  )
  const [confused, setConfused] = React.useState(
    activeCellCard.card.type !== 'structure' ? activeCellCard.confused : false
  )
  const [card, setCard] = React.useState(activeCellCard.card.id || '')

  React.useEffect(() => {
    const activeCellCard = getActiveCellCard(props)
    const isStructure = activeCellCard.card.type !== 'structure'

    setStrength(activeCellCard.strength || 1)
    setPoisoned(isStructure ? activeCellCard.poisoned : false)
    setFrozen(isStructure ? activeCellCard.frozen : false)
    setConfused(isStructure ? activeCellCard.confused : false)
    setLevel(activeCellCard.level || 1)
    setCard(activeCellCard.card.id || '')
    props.setCardSelectValue(activeCellCard.card.id || '')
  }, [props.activeCell, activeCellCard.card.id])

  React.useEffect(() => {
    // When changing the value of the card select, unset poisoned and frozen
    // checkboxes if the selected card is a structure
    if (getRawCardData(card).type === 'structure') {
      setPoisoned(false)
      setFrozen(false)
      setConfused(false)
    }
  }, [card])

  const updateStrengthField = (card, level) => {
    const resolvedCard = getRawCardData(card)
    const strength = unfoldValue(resolvedCard.strength)[+level - 1]
    if (resolvedCard.id) setStrength(strength)
    else setStrength(1)
  }

  return (
    <form
      className="BSCellForm"
      onSubmit={props.onUnitSubmit}
      data-testid="cell-form"
    >
      <div className="BSCellForm__row">
        <Row>
          <Column width={75}>
            <label className="label" htmlFor="card">
              Card
            </label>

            <CardSelect
              name="card"
              id="card"
              required
              current={card}
              onChange={option => {
                if (!option) {
                  setCard('')
                  props.setCardSelectValue('')
                } else {
                  setCard(option.value)
                  props.setCardSelectValue(option.value)
                  updateStrengthField(option.value, level)
                }
              }}
              withSpells={false}
            />
          </Column>
          <Column width={25}>
            <label htmlFor="level">Level</label>
            <select
              disabled={card.id && card.id.startsWith('T')}
              name="level"
              id="level"
              value={level}
              onChange={event => {
                setLevel(+event.target.value)
                updateStrengthField(card, +event.target.value)
              }}
              required
              data-testid="cell-level-select"
            >
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
          </Column>
        </Row>
      </div>

      <div className="BSCellForm__row">
        <Row>
          <Column>
            <label className="label" htmlFor="strength">
              Strength
            </label>
            <input
              type="number"
              name="strength"
              id="strength"
              required
              min={1}
              max={99}
              value={strength}
              onChange={event => setStrength(event.target.value)}
              data-testid="cell-strength-input"
            />
          </Column>
          <Column>
            <fieldset>
              <legend>Active player</legend>
              <div className="BSCellForm__radios">
                <Radio
                  className="GameForm__radio"
                  id="activePlayerBlue"
                  name="activePlayer"
                  value="BLUE"
                  checked={props.activePlayer === 'BLUE'}
                  onChange={event => props.setActivePlayer(event.target.value)}
                  data-testid="cell-player-BLUE-radio"
                  required
                >
                  Blue
                </Radio>

                <Radio
                  className="GameForm__radio"
                  type="radio"
                  id="activePlayerRed"
                  name="activePlayer"
                  value="RED"
                  checked={props.activePlayer === 'RED'}
                  onChange={event => props.setActivePlayer(event.target.value)}
                  data-testid="cell-player-RED-radio"
                  required
                >
                  Red
                </Radio>
              </div>
            </fieldset>
          </Column>
        </Row>
      </div>

      <fieldset>
        <legend>Penalties</legend>
        <div className="BSCellForm__row">
          <Row>
            <Column width={33}>
              <Checkbox
                name="poisoned"
                id="poisoned"
                disabled={getRawCardData(card).type === 'structure'}
                checked={poisoned}
                onChange={event => setPoisoned(event.target.checked)}
                data-testid="cell-poisoned-checkbox"
              >
                Poisoned
              </Checkbox>
            </Column>
            <Column width={33}>
              <Checkbox
                name="frozen"
                id="frozen"
                disabled={getRawCardData(card).type === 'structure'}
                checked={frozen}
                onChange={event => setFrozen(event.target.checked)}
                data-testid="cell-frozen-checkbox"
              >
                Frozen
              </Checkbox>
            </Column>
            <Column width={33}>
              <Checkbox
                name="confused"
                id="confused"
                disabled={getRawCardData(card).type === 'structure'}
                checked={confused}
                onChange={event => setConfused(event.target.checked)}
                data-testid="cell-confused-checkbox"
              >
                Confused
              </Checkbox>
            </Column>
          </Row>
        </div>
      </fieldset>

      <Row>
        <Column>
          {activeCellCard.card.id !== card ||
          activeCellCard.strength !== +strength ||
          activeCellCard.level !== +level ||
          activeCellCard.poisoned !== poisoned ||
          activeCellCard.frozen !== frozen ||
          activeCellCard.confused !== confused ||
          activeCellCard.player !== props.activePlayer ? (
            <CTA
              type="submit"
              className="BSCellForm__button"
              disabled={!card}
              data-testid="cell-form-btn"
            >
              {activeCellCard.card.id
                ? 'Update ' + activeCellCard.card.type
                : 'Add ' + (getRawCardData(card).type || '')}
            </CTA>
          ) : null}
        </Column>
        <Column>
          {!!activeCellCard.card.id ? (
            <CTA
              type="button"
              className="BSCellForm__button"
              disabled={!card}
              onClick={props.emptyActiveCell}
              data-testid="cell-form-remove-btn"
            >
              Remove {activeCellCard.card.type}
            </CTA>
          ) : null}
        </Column>
      </Row>
    </form>
  )
}

export default BSCellForm
