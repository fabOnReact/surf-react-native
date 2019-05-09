export default class Coordinates {
  constructor (data, corners) {
    const { southWest, northEast } = corners 
    this._data = data
    this._height = northEast.latitude - southWest.latitude
    this._newHeight = data.northEast.latitude - data.southWest.latitude
    this._delta = this._newHeight / this._height
  }

  get data() { return this._data; }
  get delta() { return this._delta; }
  get zoomOut() { return this._delta > 6; }
  get noZoom() { return 0.5 < this._delta < 1.5; }

  moving(position) {
    this._position = position
    if (this.noZoom) { 
      return (
        this.scrollRight || this.scrollLeft || this.scrollTop || this.scrollBottom 
      )
    }
   }

  get scrollRight() { 
    return (
      this.data.southWest.longitude > this._position.northEast.longitude
    )
  }

  get scrollLeft() {
    return (
      this.data.northEast.longitude < this._position.southWest.longitude
    )
  }
   
  get scrollTop() {
    return (
      this.data.southWest.latitude > this._position.northEast.latitude
    )
  }

  get scrollBottom() {
    return (
      this.data.northEast.latitude < this._position.southWest.latitude
    )
  }
}
