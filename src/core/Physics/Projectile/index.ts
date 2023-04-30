import { Mesh, MeshBasicMaterial, Object3D, SphereGeometry, Vector3 } from 'three';
import { v4 } from 'uuid';
import { animator } from '../../render_engine';
class Projectile {
  id: string;
  range: number;
  speed: number;
  private ProjectileObject: Object3D | null;
  private _temp_camera_vector: Vector3;
  private timeRequired: number;
  private timeElapsed: number;
  private recoilVector: Vector3;

  constructor(range: number, speed?: number, DirectionVector?: Vector3) {
    this.id = v4();
    this.range = range;
    this.speed = speed || 10;
    this.ProjectileObject = null;
    this._temp_camera_vector = DirectionVector || new Vector3();
    this.timeElapsed = 0;
    this.timeRequired = range / this.speed;
  }

  launch(recoilX = 0, recoilY = 0, ProjectileObject?: Object3D) {
    this.recoilVector = new Vector3(recoilX, recoilY, 0);

    if (ProjectileObject !== undefined) this.ProjectileObject = ProjectileObject;
    if (this.ProjectileObject === null) this.ProjectileObject = this.createProjectielTHREEJSObject();

    animator.camera.getWorldDirection(this._temp_camera_vector);
    animator.add_renderer(this.id, this.update.bind(this));

    return this;
  }

  update(clock: number) {
    if (this.timeElapsed < this.timeRequired) {
      this.ProjectileObject &&
        this.ProjectileObject.position
          .add(this._temp_camera_vector.multiplyScalar(this.speed / 100))
          .add(this.recoilVector.clone().multiplyScalar(this.timeElapsed / this.timeRequired));
      this.timeElapsed += clock;
    } else {
      animator.remove_renderer(this.id);
      this.deleteProjectile();
    }
  }

  private createProjectielTHREEJSObject() {
    const geometry = new SphereGeometry(0.1, 3, 2);
    const material = new MeshBasicMaterial({ 'color': 0xffff00 });
    const sphere = new Mesh(geometry, material);
    sphere.position.set(animator.camera.position.x, animator.camera.position.y, animator.camera.position.z);
    animator.scene.add(sphere);
    return sphere;
  }

  private deleteProjectile() {
    if (this.ProjectileObject) animator.scene.remove(this.ProjectileObject);
    this.ProjectileObject = null;
  }
}

export default Projectile;
