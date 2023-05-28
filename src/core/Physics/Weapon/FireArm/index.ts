import Projectile from '../../Projectile';

import { animator } from '../../../render_engine';
import { Clock, Vector3 } from 'three';
import State_manager from '../../../State Manager';
import { Ammo_Store_Type, Weapons } from '../../../modals';
import { v4 } from 'uuid';
class FireArm {
  private id: string;
  private typeOfBullet: keyof Ammo_Store_Type;
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
    typeOfBullet: keyof Ammo_Store_Type,
    range: number,
    fireRate: number,
    massOfBullet: number,
    speedOfBullet: number,
    MagSize: number,
    RecoilFactors: [number, number][],
    EmptyMagzine?: boolean,
    onMagzineEmpty?: () => void
  ) {
    this.id = v4();
    this.range = range;
    this.typeOfBullet = typeOfBullet;
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
    State_manager.game_state.ammo;
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
    State_manager.update_state('weapons', [
      { 'ammo': '.45acp', 'id': '', 'MagzineState': { 'count': this.MagSize - roundIndex, 'empty': false }, 'type': Weapons.Rifle },
    ]);
    new Projectile(80, 100, undefined, State_manager.game_state.Player_State?.position.clone().add(new Vector3(-0.2, 1.6, 0))).launch();
  }
}

export default FireArm;
