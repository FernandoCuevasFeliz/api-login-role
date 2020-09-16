const InjectModel = (entity: Function) => (target: any, key: any) => {
  const sKey = Symbol(key);

  const get = () => {
    // eslint-disable-next-line no-param-reassign
    if (!target[sKey]) target[sKey] = entity;
    return target[sKey];
  };

  Object.defineProperty(target, key, {
    get
  });
};

export default InjectModel;
