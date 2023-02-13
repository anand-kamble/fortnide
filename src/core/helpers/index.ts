const get_element = (id: string) => {
  if (document.getElementById) {
    return document.getElementById(id);
  }
};

const radian_from_degree: (deg: number) => number = deg => {
  return (deg * Math.PI) / 180;
};

const importShader = (path: string) => {
  return new Promise<string>(res => {
    fetch(path)
      .then(r => r.text())
      .then(text => {
        res(text);
      });
  });
};

const random_id = () => {
  const S4 = () => (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
  return S4() + S4() + '-' + S4() + '-' + S4() + '-' + S4() + '-' + S4() + S4() + S4();
};

export { get_element, radian_from_degree, importShader, random_id };
