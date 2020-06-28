import _ from "lodash";

export const dicArrayConv = (dic) => {
  return _.values(dic);
};

export const arrDictionary = (arr) => {
  return _.keyBy(params, "key");
};
