import { Vector3 } from 'three';

/* eslint-disable @typescript-eslint/no-unused-vars */
export enum User_Types {
  'Guest' = 'guest',
  'Authenticated' = 'authenticated',
}

export enum Weapons {
  'Pistol' = 'Pistol',
  'Rifle' = 'Rifle',
  'Shotgun' = 'Shotgun',
}

//TODO : COMPLETE THIS
export interface create_interface<object_T> {
  [key: string]: object_T;
}

export interface User_data {
  user_id: string;
  user_name: string;
  level: string;
  points: string;
}

export interface Ammo_Store_Type {
  '9mm'?: number;
  '50bmg'?: number;
  '12gauge'?: number;
  '.45acp'?: number;
}

export interface Player_state {
  id: string;
  health: number;
  position: Vector3;
  direction: Vector3;
  weapon: Weapons;
  state: 'Idle' | 'Walk' | 'Run' | 'Jump';
}
export interface Game_State {
  ammo: Ammo_Store_Type;
  weapons: { 'id': string; 'type': Weapons; ammo: keyof Ammo_Store_Type; MagzineState: { empty: boolean; count: number } }[];
  User: User_data | null;
  Player_State: Player_state | null;
  Other_Players: Player_state[];
  timestamp: number;
}
