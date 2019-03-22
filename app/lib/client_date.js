export default class ClientDate extends Date { 
  constructor(date) {
    super(date);
    this.iso = this.toISOString();
  }
}
