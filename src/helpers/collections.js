export const getInfoByCollection = (type, count, collection) => {
  if (!collection) return;

  return {
    enabled: collection[`${type}${count}_enabled`],
    name: collection[`${type}${count}_name`],
  };
};

export const getFieldName = (type, counter) => `${type}${counter}`;
