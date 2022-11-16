const TYPEENUM = require("../../src/TypeEnum");
module.exports = class selectObject{
  constructor(name,value,dataType = TYPEENUM.dataType.string){
    this.name = name;
    this.value = value;
    this.dataType = dataType;
  }
}
