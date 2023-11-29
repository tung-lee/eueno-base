const isExitsKey = (obj: any, key: string) => {
  return obj.hasOwnProperty(key);
};

export const isExitsKeys = (obj: any, keys: string[]) => {
  const data: string[] = [];

  keys.forEach((key) => {
    if (isExitsKey(obj, key)) {
      data.push(key);
    }
  });

  return data;
};
