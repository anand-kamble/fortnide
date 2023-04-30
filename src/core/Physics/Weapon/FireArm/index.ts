import Projectile from '../../Projectile';

import { animator } from '../../../render_engine';
import { Clock } from 'three';
class FireArm extends Projectile {
  private fireRate: number;
  private massOfBullet: number;
  private MagSize: number;
  private RecoilFactors: [number, number][];
  private Clock: Clock;
  private firedCount: number;
  private onMagzineEmpty: () => void;
  private FireLoop: NodeJS.Timer;
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
    super(range, speedOfBullet);
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
    return this.launch(this.RecoilFactors[roundIndex][0], this.RecoilFactors[roundIndex][1]);
  }
}

export default FireArm;
