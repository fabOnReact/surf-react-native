export default class Map {
  constructor (coords, position) {
    const { southWest, northEast } = position
    this._coord = coords
    this._position = position
    const height = northEast.latitude - southWest.latitude
    const newHeight = coords.northEast.latitude - coords.southWest.latitude
    this._delta = newHeight / height
  }

  get zoomOut() { return this._delta > 6; }
  get change() { return this.zoomOut || (this.noZoom && this.shift); }
  get noZoom() { return 0.5 < this._delta < 1.5; }

  get shift() {
    console.warn(this.scrollRight || this.scrollLeft || this.scrollTop || this.scrollBottom)
    return (
      this.scrollRight || this.scrollLeft || this.scrollTop || this.scrollBottom
    )
   }

  get scrollRight() { 
    return (
      this._coord.southWest.longitude > this._position.northEast.longitude
    )
  }

  get scrollLeft() {
    return (
      this._coord.northEast.longitude < this._position.southWest.longitude
    )
  }
   
  get scrollTop() {
    return (
      this._coord.southWest.latitude > this._position.northEast.latitude
    )
  }

  get scrollBottom() {
    return (
      this._coord.northEast.latitude < this._position.southWest.latitude
    )
  }
}
