const selectModule = require("./selectModule");

module.exports = class selectModel{
  constructor(selectList,fleidNameList,tableName = ''){
    this.conditionJson = selectList["conditionJson"];
    this.fleidCondition = selectModule.getWhereCondition_select(selectList["selectList"],fleidNameList,tableName);
    this.selctCondition = "";
  }

  setKeyworkdCondition = (dateFleidName) =>{
    if(this.fleidCondition !== ""){
      this.fleidCondition = `${this.fleidCondition} AND`;
    }
    this.fleidCondition = `${this.fleidCondition} ${dateFleidName} LIKE '%${this.conditionJson.keyword}%'` 
  }

  setTargetCondition = (dateFleidName) =>{
    if(this.fleidCondition !== ""){
      this.fleidCondition = `${this.fleidCondition} AND`;
    }
    this.fleidCondition = `${this.fleidCondition} ${dateFleidName} LIKE '%${this.conditionJson.target}%'` 
  }

  setKeyworkdListCondition = (dateFleidNameList) =>{
    if(this.fleidCondition !== ""){
      this.fleidCondition = `${this.fleidCondition} AND`;
    }
    let query = '';
    for(let felidname of dateFleidNameList){
      if(query !== '') query = `${query} OR`
      query = `${query} ${felidname} LIKE '%${this.conditionJson.keyword}%'`
    }
    this.fleidCondition = `${this.fleidCondition} (${query})` 
  }

  setKeywordSeperatedCondition = (dateFleidNameList) =>{
    if(this.fleidCondition !== ""){
      this.fleidCondition = `(${this.fleidCondition}) AND`;
    }
    let query = '';
    for(let felidname of dateFleidNameList){
      if(query !== '') query = `${query} OR`
      query = `${query} ${felidname} LIKE '%${this.conditionJson.keyword}%'`
    }
    this.fleidCondition = `${this.fleidCondition} (${query})` 
  }

  setDuringCondition = (dateFleidName) =>{
    if(this.fleidCondition !== ""){
      this.fleidCondition = `${this.fleidCondition} AND`;
    }
    this.fleidCondition = `${this.fleidCondition} DATE(${dateFleidName}) between DATE('${this.conditionJson.starttime}') and DATE('${this.conditionJson.endtime}')`;
  }

  setDateInclude = (dateFleidStart="starttime",dateFleidEnd="endtime") =>{
    if(this.fleidCondition !== ""){
      this.fleidCondition = `${this.fleidCondition} AND`;
    }
    this.fleidCondition = `${this.fleidCondition} ((DATE('${this.conditionJson.endtime}') >= DATE(${dateFleidStart}) AND DATE('${this.conditionJson.starttime}') <= DATE(${dateFleidEnd}) )OR (DATE('${this.conditionJson.starttime}') <= DATE(${dateFleidEnd}) AND DATE('${this.conditionJson.starttime}') >= DATE(${dateFleidStart})))`;
  }
  setPagination = (dateFleidName,sortType) =>{
    this.selctCondition = `ORDER BY ${dateFleidName} ${sortType} ${this.selctCondition} LIMIT ${this.conditionJson.count} OFFSET ${this.conditionJson.count*(this.conditionJson.page-1)}`;
  }

  addFleidWhereString = (string) =>{
    if(this.fleidCondition !== ""){
      this.fleidCondition = `${this.fleidCondition} AND`;
    }
    this.fleidCondition = `${this.fleidCondition} ${string}`
  }

  addFleidWhere = (fleidName,value) =>{
    if(this.fleidCondition !== ""){
      this.fleidCondition = `${this.fleidCondition} AND`;
    }
    this.fleidCondition = `${this.fleidCondition} ${fleidName} = ${value}`
  }

  addFleidWhereOR = (fleidName,value) =>{
    if(this.fleidCondition !== ""){
      this.fleidCondition = `${this.fleidCondition} OR`;
    }
    this.fleidCondition = `${this.fleidCondition} ${fleidName} = ${value}`
  }

  addFleidORWhere = (fleidName,valueList) =>{
    if(this.fleidCondition !== ""){
      this.fleidCondition = `${this.fleidCondition} AND`;
    }
    let text = "";
    for(const index in valueList){
      text = `${text} ${fleidName} = ${valueList[index]}`;
      if(parseInt(index) !== valueList.length -1){
        text = `${text} OR`
      }else{
        text = `(${text})`;
      }
    }
    this.fleidCondition = `${this.fleidCondition} ${text}`
  }

  getFleidWhere = () =>{
    if(this.fleidCondition !== ''){
      return `WHERE(${this.fleidCondition})`;
    }else{
      return ``;
    }
  }

  getfleidCondition = () =>{
    return this.fleidCondition;
  }

  getwherecondition = () =>{
    if(this.fleidCondition !== ''){
      return `WHERE(${this.fleidCondition}) ${this.selctCondition}`;
    }else{
      return `${this.selctCondition}`;
    }
  }
}
