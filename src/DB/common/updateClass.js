const selectModule = require("./selectModule");

module.exports = class updateModel{
  constructor(whereList,updateList){
    this.whereList = whereList;
    this.fleidValue = updateList;
  }

  getWhere = () =>{
    let where = "";
    for(let val of this.whereList){
      if(where !== ""){
        where = `${where} AND`;
      }
      where = `${where} ${val.name} = "${val.value}"`
    }

    return `WHERE(${where})`;
  }

  getFleidValue = () =>{
    let fleidValue = "";
    for(let val of this.fleidValue){
      if(fleidValue !== ""){
        fleidValue = `${fleidValue},`;
      }
      fleidValue = `${fleidValue} ${val.name} = "${val.value}"`
    }

    return fleidValue;
  }
}
