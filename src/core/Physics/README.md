# [Physics](./physics.ts#L4)

This is most important part of the project. A physics world.  
We can add all the objects which will be the part of the physics world and assign weight and other parameters to them, this allows us to make the game world interact with the user just like the real world by using the simulation techniques.

The [Physics Class](./index.ts#L6) is structured slightly differently than others since it includes a lot of methods, these methods are seperated into different files which allows us to maintain the cleanliness of the code. Additionally, it also helps to avoid merge conflits.

## Below are some additional classes.

---

## [Projectile](./Projectile/index.ts#L4)

This class creates a Projectile object which can be fired from camera and in the direction camera is looking at. A recoil factor can also be passed which will affect the trajectory of the projectile. The position of the projectile object is updated with every frame.

```
Note :
Projectile is updated directly by the animator, this has been done in order to
reduce load on the physics world updator since there can be numerous projectiles in scene
at the same time.
```

---

## [Firearm](./Weapon/FireArm/index.ts#L5)

Based on projectile, this generates an object required for simulation of firearms and implements the simulation methods such as recoil and handles all the necessary variables including magzine size, rate of fire, speed and weight of the bullet. Also provides a method to add callback when the magnize empties, which allows to add functions which will handle the reload animations and other messages.
