class DateHelper extends Date {
  get distance() {
    if (this.is_seconds) { return this.in_seconds }
    if (this.is_minutes) { return this.in_minutes }
    if (this.is_hours) { return this.in_hours }
    if (this.is_days) { return this.in_days }
    if (this.is_months) { return this.in_months }
    // console.log('The current case was not managed. Seconds has value of: ' + this.seconds)
  }

  get in_seconds() {
		return `${this.seconds}s ago`
  }

	get in_minutes() {
		return `${this.minutes}m ago`
  }
	get in_hours() {
		return `${this.hours}h ago`
  }
  get in_days() {
    return `${this.days}d ago`
  }
  get in_months() {
    return `${this.months} month ago`
  }
  get is_seconds() {
    return this.seconds < 60 
  }
  get is_minutes() {
    return 60 > this.minutes > 0
  }
  get is_hours() {
    return 24 > this.hours > 0 
  }
  get is_days() {
    return 30 > this.days > 0
  }
  get is_months() {
    return 12 > this.months > 0
  }
  get seconds() {
    const milleseconds = this.current - this
    return parseInt(milleseconds / 1000)
  }
	get minutes() {
		return parseInt(this.seconds / 60)
  }
	get hours() {
		return parseInt(this.minutes / 60)
  }
  get days() {
    return parseInt(this.hours / 24)
  }
  get months() {
    return parseInt(this.days / 31)
  }
  get current() { 
    return new Date(Date.now()) 
  }
}  

export default DateHelper
