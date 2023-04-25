import { Vector3, Raycaster } from 'three';
import { v4 } from 'uuid';
import { animator } from '../../render_engine';
class Projectile {
  id: string;
  raycaster: Raycaster;
  private initialPoint: Vector3;
  private target: Vector3;

  constructor() {
    this.id = v4();
    this.raycaster = new Raycaster();
  }

  launch(x?: number, y?: number) {
    this.initialPoint = animator.camera.position.clone();
    this.raycaster.setFromCamera({ 'x': x || 0, 'y': y || 0 }, animator.camera);
    const intersects = this.raycaster.intersectObjects(animator.scene.children);
    this.target = intersects[0]?.point.clone();
    return this;
  }

  path() {
    if (this.target) {
      const segments = 20;
      const path = [];
      for (let i = 0; i < segments; i++) {
        path.push(this.initialPoint.clone().lerp(this.target.clone(), i / segments));
      }

      /* FOR DEBUG PURPOSE */
      /* uncomment the following code and import necessary classes from three js */
      /* this will allow you to visualize the generated path */
      // const geometry = new BufferGeometry().setFromPoints(path);
      // const material = new LineBasicMaterial({
      // 'color': 0x0000ff,
      // });
      // const line = new Line(geometry, material);
      // animator.scene.add(line);

      return path;
    }
  }
}

export default Projectile;
