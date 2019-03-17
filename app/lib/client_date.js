export default class ClientDate extends Date { 
    constructor() {
		super();
		this.iso = this.toISOString();
    }
}

function sum(a, b) {
  return a + b;
}

module.exports = sum;
