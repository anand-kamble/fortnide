const get_element = (id: string) => {
  if (document.getElementById) {
    return document.getElementById(id);
  }
};

const radian_from_degree: (deg: number) => number = deg => {
  return (deg * Math.PI) / 180;
};

export { get_element, radian_from_degree };
