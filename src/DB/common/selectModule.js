const TYPEENUM = require("../../src/TypeEnum");
exports.getWhereCondition_select = (selectList, fleidList,tableName = '') => {
  let wherecondition = "";

  for (let val in selectList) {
    if (fleidList.includes(selectList[val].name)) {
      //존재하는 필드 또는 조건만 적용
      if (wherecondition !== "") wherecondition = `${wherecondition} AND`;
      switch (selectList[val].dataType) {
        case TYPEENUM.dataType.string:
        case TYPEENUM.dataType.datetime:
          wherecondition = `${wherecondition} ${tableName}${selectList[val].name} = '${selectList[val].value}'`;
          break;
        case TYPEENUM.dataType.integer:
          wherecondition = `${wherecondition} ${tableName}${selectList[val].name} = ${selectList[val].value}`;
          break;
      }
    }
  }

  return wherecondition;
};

exports.getPaginationInfo = async (result, countResult, count, page) => {
  const totalpage = countResult[0].cnt / count;
  let total = 1;
  if (Number.isInteger(totalpage)) {
    total = totalpage;
  } else {
    total = Math.floor(totalpage) + 1;
  }
  result["pageinfo"] = {
    total: total,
    current: parseInt(page),
    totalCnt : countResult[0].cnt
  };
  return result;
}