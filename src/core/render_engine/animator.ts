class _animator {
  renderers: {
    'id': string;
    'render_function': Function;
  }[];
  constructor() {
    this.renderers = [];
  }

  add(id: string, render_function: Function) {
    this.renderers.push({
      'id': id,
      'render_function': render_function,
    });
  }

  remove(id: string) {
    this.renderers.splice(
      this.renderers.findIndex(v => v.id === id),
      1
    );
  }

  update() {
    if (this.renderers.length) this.renderers[0].render_function();
  }
}

const animator = new _animator();
export default animator;
