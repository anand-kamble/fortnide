/* eslint-disable @typescript-eslint/no-unused-vars */
export enum User_Types {
  'Guest' = 'guest',
  'Authenticated' = 'authenticated',
}

//TODO : COMPLETE THIS
export interface create_interface<object_T> {
  [key: string]: object_T;
}
