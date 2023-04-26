# Render Engine

Handles all the rendering of the game and also keeps everything in sync by using the Clock provided by ThreeJS.

### Following are the classes of implemented in render engine :

## [Animator](./animator.ts#L4)

Handle the whole scene which is being rendered and also provides methods to add child renderes (Child renderes are used to divide a large scene into smaller parts) and keeps them in a sync. Also, exposes the important part of the scene to be used in other places of the project such as camera.

---

## [Third Person](./set_third_person.ts#L6)

This function sets the third person camera to the provided object and makes to easy to swich views.
E.g. Switching from player to a car when player enters the car.

---
