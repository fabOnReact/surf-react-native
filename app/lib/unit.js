class Setting {} 

export default class Unit {
  constructor(props) {
    const { european, unit, value } = props
    this._european = european
    this._value = value
    this._unit = unit
  }

  get value() {
    if(this._european) {
      return parseInt(this.mt)
    } 
    return parseInt(this.ft)
  }

  get unit() {
    return this._unit
  }

  get mt() {
    return this._value / 3.28
  }

  get ft() {
    return this._value * 3.28
  }
}
