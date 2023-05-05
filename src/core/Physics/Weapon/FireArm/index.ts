import Projectile from '../../Projectile';

import { animator } from '../../../render_engine';
import { Clock, Vector3 } from 'three';
import State_manager from '../../../State Manager';
class FireArm {
  private fireRate: number;
  private massOfBullet: number;
  private MagSize: number;
  private RecoilFactors: [number, number][];
  private Clock: Clock;
  private firedCount: number;
  private onMagzineEmpty: () => void;
  private FireLoop: NodeJS.Timer;
  private range: number;
  private speedOfBullet: number;
  EmptyMagzine: boolean;
  constructor(
    range: number,
    fireRate: number,
    massOfBullet: number,
    speedOfBullet: number,
    MagSize: number,
    RecoilFactors: [number, number][],
    EmptyMagzine?: boolean,
    onMagzineEmpty?: () => void
  ) {
    this.range = range;
    this.speedOfBullet = speedOfBullet;
    this.fireRate = fireRate;
    this.massOfBullet = massOfBullet;
    this.MagSize = MagSize;
    this.RecoilFactors = RecoilFactors;
    this.Clock = animator.clock;
    this.firedCount = 0;
    this.EmptyMagzine = EmptyMagzine || false;
    this.onMagzineEmpty =
      onMagzineEmpty ||
      (() => {
        return;
      });
  }

  startFire() {
    this.firedCount = 0;
    this.FireLoop = setInterval(
      (() => {
        if (this.firedCount < this.MagSize) {
          this.fire(this.firedCount);
          this.firedCount++;
        } else {
          this.EmptyMagzine = true;
          this.onMagzineEmpty();
        }
      }).bind(this),
      1000 / this.fireRate
    );
  }

  stopFire() {
    clearInterval(this.FireLoop);
  }

  reload(ammoCount: number) {
    this.MagSize += ammoCount;
  }

  private fire(roundIndex: number) {
    roundIndex;
    new Projectile(80, 100, undefined, State_manager.game_state.Player_State?.position.clone().add(new Vector3(-0.2, 1.6, 0))).launch();
  }
}

export default FireArm;
