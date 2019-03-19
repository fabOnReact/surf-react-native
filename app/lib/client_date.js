export default class ClientDate extends Date { 
  constructor() {
      super();
      this.iso = this.toISOString();
  }
}
