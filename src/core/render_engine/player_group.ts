//@ts-nocheck

import animator from './animator';
import glft_data from '../media/models/Xbot.glb';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { AnimationMixer, BoxBufferGeometry, Group, Mesh, MeshNormalMaterial, PointLight, Vector3 } from 'three';
import { radian_from_degree } from '../helpers';
import set_third_person from './set_third_person';
import global_variables from '../global_variables';

const player_group_object = () => {
  const loader = new GLTFLoader();
  const player_group = new Group();
  let player_model,
    animations,
    mixer,
    numAnimations = 0,
    allActions = [],
    camera = animator.camera,
    model_loaded = false,
    tempCameraVector = new Vector3(),
    tempModelVector = new Vector3(),
    movingForward = false;
  const baseActions = {
    'idle': { 'weight': 1 },
    'walk': { 'weight': 0 },
    'run': { 'weight': 0 },
  };
  function setWeight(action, weight) {
    action.enabled = true;
    action.setEffectiveTimeScale(1);
    action.setEffectiveWeight(weight);
  }
  function activateAction(action) {
    const clip = action.getClip();
    const settings = baseActions[clip.name];
    setWeight(action, settings.weight);
    action.play();
  }

  loader.load(glft_data, function (gltf) {
    gltf.scene.rotateX(radian_from_degree(90));
    player_model = gltf.scene;
    player_model.castShadow = true;
    player_model.receiveShadow = true;
    player_group.add(player_model);
    animations = gltf.animations; // Array<AnimationClip>
    gltf.scene; // Group
    gltf.scenes; // Array<Group>
    gltf.cameras; // Array<Camera>
    gltf.asset; // Object
    gltf.scene.traverse(function (child) {
      if (child.isMesh) {
        child.castShadow = true;
      }
    });

    mixer = new AnimationMixer(player_model);
    model_loaded = true;
    let a = animations.length;
    for (let i = 0; i < a; ++i) {
      let clip = animations[i];
      const name = clip.name;
      if (baseActions[name]) {
        const action = mixer.clipAction(clip);
        activateAction(action);
        baseActions[name].action = action;
        allActions.push(action);
        numAnimations += 1;
      }
    }
  });

  window.addEventListener('keydown', e => {
    const { keyCode } = e;
    if (keyCode === 87 || keyCode === 38) {
      baseActions.idle.weight = 0;
      baseActions.run.weight = 5;
      activateAction(baseActions.run.action);
      activateAction(baseActions.idle.action);
      movingForward = true;
    }
  });

  window.addEventListener('keyup', e => {
    const { keyCode } = e;
    if (keyCode === 87 || keyCode === 38) {
      baseActions.idle.weight = 1;
      baseActions.run.weight = 0;
      activateAction(baseActions.run.action);
      activateAction(baseActions.idle.action);
      movingForward = false;
    }
  });

  // Created a point around which the camera will revolve.
  var geometry = new BoxBufferGeometry(0, 0, 0);
  var material = new MeshNormalMaterial();
  var revolve_point = new Mesh(geometry, material);
  revolve_point.position.y = 1.6;
  revolve_point.position.x = -0.2;

  // Set the third person camera to follow the point.
  set_third_person(revolve_point);

  const light = new PointLight(0xff0000, 1, 100);
  light.position.set(3, -3, 3);
  player_group.add(light);
  player_group.add(revolve_point);
  player_group.rotateX(radian_from_degree(-90));

  animator.scene.add(player_group);

  animator.add_renderer('player_group', clock => {
    if (model_loaded) {
      for (let i = 0; i < numAnimations; i++) {
        const action = allActions[i];
        const clip = action.getClip();
        const settings = baseActions[clip.name];
        settings.weight = action.getEffectiveWeight();
      }
      if (movingForward) {
        // player_group.position.z += 0.1;

        camera.getWorldDirection(tempCameraVector);
        const cameraDirection = tempCameraVector.setY(0).normalize();

        // Get the X-Z plane in which player is looking to compare with camera
        player_model.getWorldDirection(tempModelVector);
        const playerDirection = tempModelVector.setY(0).normalize();

        // Get the angle to x-axis. z component is used to compare if the angle is clockwise or anticlockwise since angleTo returns a positive value
        const cameraAngle = cameraDirection.angleTo(global_variables.X_axis) * (cameraDirection.z > 0 ? 1 : -1);
        const playerAngle = playerDirection.angleTo(global_variables.X_axis) * (playerDirection.z > 0 ? 1 : -1);

        // Get the angle to rotate the player to face the camera. Clockwise positive
        const angleToRotate = playerAngle - cameraAngle;

        // Get the shortest angle from clockwise angle to ensure the player always rotates the shortest angle
        let sanitisedAngle = angleToRotate;
        if (angleToRotate > Math.PI) {
          sanitisedAngle = angleToRotate - 2 * Math.PI;
        }
        if (angleToRotate < -Math.PI) {
          sanitisedAngle = angleToRotate + 2 * Math.PI;
        }

        // Rotate the model by a tiny value towards the camera direction
        player_model.rotateY(Math.max(-0.5, Math.min(sanitisedAngle, 0.5)));
        player_group.position.add(cameraDirection.multiplyScalar(0.05));
      }
      revolve_point.position.y = player_group.position.y + 1.6;
      revolve_point.position.x = player_group.position.x - 0.2;
      revolve_point.position.z = player_group.position.z;

      mixer.update(clock);
    }
  });
};
export default player_group_object;
