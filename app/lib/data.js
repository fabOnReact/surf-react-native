import Unit from './unit';

export default class Data { 
  constructor({ swellHeight, swellPeriod, windSpeed, imperial, i}) {
    this._swellHeight = new Unit({ value: swellHeight })
    this._swellPeriod = swellPeriod
    this._windSpeed = new Unit({ value: windSpeed })
    this._imperial = imperial
    this._i = i
  }

  get swell() {
    return `${this.swellHeight} @ ${this.swellPeriod}`
  }

  get swellHeight() {
    if (this._imperial) {
      return this._swellHeight.ft
    }
    return this._swellHeight.mt
  }

  get swellPeriod() {
    return `${parseInt(this._swellPeriod)} s.`
  }

  get wind() {
    return `${this.windSpeed}`
  }

  get windSpeed() {
    if (this._imperial) {
      return this._windSpeed.mph
    }
    return this._windSpeed.mts
  }
}
