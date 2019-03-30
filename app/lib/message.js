export default class Message {
  constructor(obj) {
    this.generateMessages(obj)
    if (obj["error"] !== undefined) { this._errors = obj["error"] }
  }

  get errors () { return this._errors }

  generateMessages(json) {
    this._errors = ""
    for (var element in json) { 
      this._errors += `The field ${element} ${json[element]}. ` 
    }
  }
}
