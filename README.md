# A competetive web game

Fortnide is a project where I am trying to create a game similar to [Fortnite](https://www.fortnite.com/) which can run on the browser. Obviously, I cannot make it with all the features like the original fornite (since I'm not [Epic Games](https://www.epicgames.com/site/en-US/home)) but I will be implementing the essential features like building, shooting, emotes,and maybe a car.

> **Note**
> Project under development.

---

You can try it out by following these steps :

1. Clone the repository.  
   You can download the zip file or you if you have git installed on your machine you can run the following command

   ```
   git clone https://github.com/anand-kamble/fortnide.git
   ```

2. Install the required packages by running following command in folder you just cloned by running.

   ```
   yarn install
   ```

   > I'm assuming that you have NodeJS and Yarn installed, if not you can get NodeJS from [https://nodejs.org/en](https://nodejs.org/en)  
   > And after installing NodeJS you can install Yarn by running `npm install -g yarn`

3. Start the game.
   Use the following command to start the project.

   ```
   yarn start
   ```

   > This might take couple minutes for the first run depending on your machine.

   ***

   Once ready, it should automatically open the game in the default browser of your system and you will see the screen as below.
   ![Default View](./docs/images/Default%20render.png)

   Here you can move around using the mouse and walk forward by pressing the W key.  
   Also, if you click the left mouse button you'll see a projectile being fired whos trajectory is calculated based on your current position and the direction you are looking at. The projectiles path will be slightly curved in the upwards left direction, as I have programmed it to do that, this functionlity will allow me to add effects like recoil and wind direction on the projectile.

   ![Projectile Render](./docs/images/Projectile%20Render.png)

---

Have a suggestion ??  
Please [create an issue](https://github.com/anand-kamble/fortnide/issues) labeled `Suggestion`

---

<details>
<summary>Interested in the working of this project ?</summary>
<br>

This project is divided into following parts, open the one your interested in you'll get a more detailed desrciption of how everything is put together.

[• Core](./src/core/)

[• Logger](./src/Logger/)

[• UI](./src/UI/)

</details>

---

## Contact

[Email](mailto:anandmk837@gmail.com) • [Instagram](https://www.instagram.com/anandkamble_/) • [LinkedIn](https://www.linkedin.com/in/anandmkamble/)

---
