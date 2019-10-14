import { serialize } from './support';

export default class Map {
  constructor (coords) {
    this._current = coords
    this._previous = coords
  }

  set previous(coords) { this._previous = coords }
  get previous() { return this._previous }
  set current(coords) { this._current = coords }
  get current() { return this._current }

  get previous_height() {
    const { southWest, northEast } = this.previous
    return northEast.latitude - southWest.latitude
  }

  get height() {
    const { northEast, southWest } = this.current
    return northEast.latitude - southWest.latitude
  }

  get delta () {
    return this.previous_height / this.height
  }

  get zoomOut() { return this.delta > 5; }
  get zoomIn() { return 0.5 > this.delta > 0.1 }
  get shouldUpdate() { return this.zoomIn || this.zoomOut || this.shift }
  get noZoom() { return 0.5 < this.delta < 1.5; }
  get inOverview() { return this.height > 10 }

  get shift() {
    return this.noZoom && this.scroll
  }

  get scroll() {
    return this.scroll_horizontal || this.scroll_vertical
  }

  get scroll_horizontal() {
    return this.scrollRight || this.scrollLeft
  }

  get scroll_vertical() {
    return this.scrollTop || this.scrollBottom
  }

  get scrollRight() { 
    const { southWest: { longitude: current_longitude }} = this.current
    const { northEast: { longitude: previous_longitude }} = this.previous
    return ( current_longitude < previous_longitude )
  }

  get scrollLeft() {
    const { northEast: { longitude: current_longitude }} = this.current
    const { southWest: { longitude: previous_longitude }} = this.previous
    return ( current_longitude < previous_longitude)
  }
   
  get scrollTop() {
    const { southWest: { latitude: current_latitude }} = this.current
    const { northEast: { latitude: previous_latitude }} = this.previous
    return ( current_latitude > previous_latitude)
  }

  get scrollBottom() {
    const { northEast: { latitude: current_latitude }} = this.current
    const { southWest: { latitide: previous_latitude }} = this.previous
    return ( current_latitude < previous_latitude)
  }
}
