import Data from './data';
import Unit from './unit';

export default class Daily extends Data { 
  constructor({ swellHeight, waveHeight, swellPeriod, windSpeed, imperial, i}) {
    super({swellHeight, swellPeriod, windSpeed, imperial})
    this._swellHeight = new Unit({ value: swellHeight[i] })
    this._waveHeight = new Unit({ value: waveHeight[i] })
    this._windSpeed = new Unit({ value: windSpeed[i] })
  }

  get waveHeight() {
    if (this._imperial) {
      return this._waveHeight.ft
    }
    return this._waveHeight.mt
  }
}
