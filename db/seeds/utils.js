const db = require("../../db/connection");

exports.convertTimestampToDate = ({ created_at, ...otherProperties }) => {
  if (!created_at) return { ...otherProperties };
  return { created_at: new Date(created_at), ...otherProperties };
};

exports.createLookupObj = (array, key, value) => {
  const lookup = {};
  for (const item of array) {
    lookup[item[key]] = item[value];
  }
  return lookup;
};
