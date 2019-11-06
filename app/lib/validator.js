class Validator { 
  static regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  static emailFieldError = "Your email is not valid"
  static textFieldError = "You did not include an explanation (at least 150 characters) motivating your reasons to request the video removal."

  constructor(props) {
    const { post: { email, reason }} = props
    this._email = email
    this._reason = reason
  }

  set params(props) {
    const { post: { email, reason }} = props
    this._email = email
    this._reason = reason
  }

  get errors() {
    const err = []
    if(!this.validText) {
      err.push(Validator.textFieldError)
    }
    if(!this.validEmail) {
      err.push(Validator.emailFieldError)
    }
    return err.join(", ")
  }

  get validEmail() {
    return Validator.regex.test(this._email);
  }

  get validText() {
    return this._reason.length > 150
  }

  get valid() {
    return this.validEmail && this.validText
  }
}

export default Validator
