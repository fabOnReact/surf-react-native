export default class Unit {
  constructor({ value }) {
    this._value = value
  }

  get to_ft() {
    return this._value * 3.28
  }

  get ft() {
    return `${parseInt(this.to_ft)} ft.`
  }

  get mt() {
    return `${this._value.toFixed(1)} mt.`
  }

  get mts() {
    return `${parseInt(this._value)} mt/s`
  }

  get to_mph() {
    return this._value * 2.2369363 
  }

  get mph() {
    return `${parseInt(this.to_mph)} mph.`
  }
}
