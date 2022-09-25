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

export { get_element, radian_from_degree, importShader };
