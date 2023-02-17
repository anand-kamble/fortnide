import animator from './animator';
import glft_data from '../media/models/Xbot.glb';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { AnimationAction, AnimationMixer, BoxBufferGeometry, Group, Mesh, MeshNormalMaterial, PointLight, Vector3 } from 'three';
import { radian_from_degree } from '../helpers';
import set_third_person from './set_third_person';
import global_variables from '../helpers/global_variables';
import browser_bridge from '../helpers/browser_initiator';
import input_keys from '../input_keys';

const player_group_object = () => {
  const loader = new GLTFLoader();
  const player_group = new Group();
  const camera = animator.camera;
  const tempCameraVector = new Vector3();
  const tempModelVector = new Vector3();
  const allActions: AnimationAction[] = [];
  let player_model: Group,
    animations,
    mixer: AnimationMixer,
    numAnimations = 0,
    model_loaded = false,
    movingForward = false;
  const baseActions: { [k: string]: { [k: string]: AnimationAction | number } } = {
    'idle': { 'weight': 1 },
    'walk': { 'weight': 0 },
    'run': { 'weight': 0 },
    'sneak_pose': { 'weight': 0 },
  };
  const setWeight = (action: AnimationAction, weight: AnimationAction | number) => {
    action.enabled = true;
    action.setEffectiveTimeScale(1);
    action.setEffectiveWeight(weight as number);
  };
  const activateAction = (action: AnimationAction) => {
    const clip = action.getClip();
    const settings = baseActions[clip.name];
    setWeight(action, settings.weight);
    action.play();
  };

  loader.load(glft_data, gltf => {
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
      if ((child as Mesh).isMesh) {
        child.castShadow = true;
      }
    });

    mixer = new AnimationMixer(player_model);
    model_loaded = true;
    const a = animations.length;
    for (let i = 0; i < a; ++i) {
      const clip = animations[i];
      const name = clip.name;
      baseActions[name] = {};
      const action = mixer.clipAction(clip);
      activateAction(action);
      baseActions[name].action = action;
      allActions.push(action);
      numAnimations += 1;
    }
  });

  browser_bridge.addCallback('keydown', 'player_movement_start_forward', e => {
    const { code } = e;
    if (code === input_keys.getKey('moment-forward') && global_variables.allow_update()) {
      baseActions.idle.weight = 0;
      baseActions.run.weight = 1;
      activateAction(baseActions.run.action as AnimationAction);
      activateAction(baseActions.idle.action as AnimationAction);
      movingForward = true;
    }
  });

  browser_bridge.addCallback('keyup', 'player_movement_end_forward', e => {
    const { code } = e;
    if (code === input_keys.getKey('moment-forward') && global_variables.allow_update()) {
      baseActions.idle.weight = 1;
      baseActions.run.weight = 0;
      activateAction(baseActions.run.action as AnimationAction);
      activateAction(baseActions.idle.action as AnimationAction);
      movingForward = false;
    }
  });

  browser_bridge.addCallback('keydown', 'player_movement_start_backward', e => {
    const { code } = e;
    if (code === input_keys.getKey('moment-backward') && global_variables.allow_update()) {
      baseActions.idle.weight = 0;
      baseActions.sneak_pose.weight = 1;
      activateAction(baseActions.run.action as AnimationAction);
      activateAction(baseActions.idle.action as AnimationAction);
      movingForward = true;
    }
  });

  browser_bridge.addCallback('keyup', 'player_movement_end_backward', e => {
    const { code } = e;
    if (code === input_keys.getKey('moment-backward') && global_variables.allow_update()) {
      baseActions.idle.weight = 1;
      baseActions.sneak_pose.weight = 0;

      activateAction(baseActions.run.action as AnimationAction);
      activateAction(baseActions.idle.action as AnimationAction);
      movingForward = false;
    }
  });

  browser_bridge.addCallback('keydown', 'player_movement_start_right', e => {
    const { code } = e;
    if (code === input_keys.getKey('moment-right') && global_variables.allow_update()) {
      baseActions.idle.weight = 0;
      baseActions.sneak_pose.weight = 1;
      activateAction(baseActions.run.action as AnimationAction);
      activateAction(baseActions.idle.action as AnimationAction);
      movingForward = true;
    }
  });

  browser_bridge.addCallback('keyup', 'player_movement_end_right', e => {
    const { code } = e;
    if (code === input_keys.getKey('moment-right') && global_variables.allow_update()) {
      baseActions.idle.weight = 1;
      baseActions.sneak_pose.weight = 0;

      activateAction(baseActions.run.action as AnimationAction);
      activateAction(baseActions.idle.action as AnimationAction);
      movingForward = false;
    }
  });

  browser_bridge.addCallback('keydown', 'player_movement_start_left', e => {
    const { code } = e;
    if (code === input_keys.getKey('moment-left') && global_variables.allow_update()) {
      baseActions.idle.weight = 0;
      baseActions.sneak_pose.weight = 1;
      activateAction(baseActions.run.action as AnimationAction);
      activateAction(baseActions.idle.action as AnimationAction);
      movingForward = true;
    }
  });

  browser_bridge.addCallback('keyup', 'player_movement_end_left', e => {
    const { code } = e;
    if (code === input_keys.getKey('moment-left') && global_variables.allow_update()) {
      baseActions.idle.weight = 1;
      baseActions.sneak_pose.weight = 0;

      activateAction(baseActions.run.action as AnimationAction);
      activateAction(baseActions.idle.action as AnimationAction);
      movingForward = false;
    }
  });

  // Created a point around which the camera will revolve.
  const geometry = new BoxBufferGeometry(0, 0, 0);
  const material = new MeshNormalMaterial();
  const revolve_point = new Mesh(geometry, material);
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
      if (movingForward && global_variables.allow_update()) {
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
