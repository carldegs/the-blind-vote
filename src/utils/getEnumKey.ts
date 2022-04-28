const getEnumKey = (enumObj, value) =>
  Object.keys(enumObj)[Object.values(enumObj).indexOf(value)];

export default getEnumKey;
