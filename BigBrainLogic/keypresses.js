export class KeyPresshandler {
    constructor (builder,character) {
        this.builder = builder;
        this.character = character;
        this._moveForward = false;
        this._moveLeft = false;
        this._moveBack = false;
        this._moveRight = false;
        this._buildWall = false;
        this._buildStair = false; 
        this._buildMode = false;
        this._key_PrimaryMouse = 0;
        this._key_SecondaryMouse = 2;
        this._key_moveForward = 87//'W';
        this._key_moveLeft = 65 //'A';
        this._key_moveBack = 83//'S';
        this._key_moveRight = 68 //'D';
        this._key_buildStair = 3;
        this._key_buildWall = 4;
    }


    keyPressed(event){
        switch (event){
            case this._key_moveForward:
                this._moveForward = true;
                this.character.UpdateFromUser('Forward')
                break;
            case this._key_moveLeft:
                this._moveLeft = true;
                break;
            case this._key_moveBack:
                this._moveBack = true;
                this.character.UpdateFromUser('Back')
                break;
            case this._key_moveRight:
                this._moveRight = true;
                break;
            case 'q':
                this.q = true;
                break;
            case 'e':
                this.e = true;
                break;
        }
    }

    keyReleased(event){
        switch (event){
            case this._key_moveForward:
                this._moveForward = false
                break;
            case this._key_moveLeft:
                this._moveLeft = false
                break;
            case this._key_moveBack:
                this._moveBack = false
                break;
            case this._key_moveRight:
                this._moveRight = false
                break;
            case 'q':
                this.q = false
                break;
            case 'e':
                this.e = false
                break;
        }
    }

    mouseButtonClicked ( ButtonCode ){
        console.log('Unexpected code: ' + ButtonCode);
        switch (ButtonCode) {
            case this._key_buildWall:
                if(this._buildMode){
                    this.builder.place();
                }else{
                    this.builder.init();
                    this.builder.place();
                    this._buildMode = true;
                };
                break;
            case this._key_buildStair:
                if(this._buildMode){
                    this.builder.place();
                }else{
                    this.builder.init();
                    this.builder.place();
                    this._buildMode = true;
                };
                break;

            case this._key_PrimaryMouse:
                if(this._buildMode){
                    this.builder.place();
                }
                break;

            default:
                console.log('Unexpected code: ' + ButtonCode);
        }
    }
}