const get_element = (id: string) => {
  if (document.getElementById) {
    return document.getElementById(id);
  }
};

export { get_element };
