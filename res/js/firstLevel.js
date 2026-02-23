import { 
    nearLocation,
    moveRight,
    moveLeft,
    stopMoving,
    makeJump,
    createCheckpoint
} from "./helperFunctions.js";

let audioFiles = {
    you_got_it: "you_got_it.wav",
    lava_ahead: "lava_ahead.wav",
    made_jump: "made_jump.wav",
    nice_jump: "nice_jump.wav",
    up_we_go: "up_we_go.wav",
    acid_ahead: "acid_ahead.wav",
    acid_not_scary: "acid_not_scary.wav",
    lever_does: "lever_does.wav",
    doing_great: "doing_great.wav",
    onwards: "onwards.wav",
    water_press_button: "water_press_button.wav",
    wait: "wait.wav",
    keep_button_pressed: "keep_button_pressed.wav",
    block_strong: "block_strong.wav",
    finish_line: "finish_line.wav",
    diamonds: "diamonds.wav",
    spot_exit: "spot_exit.wav",
    teamwork: "teamwork.wav",
    lever_important: "lever_important.wav",
    stuck_restart: "stuck_restart.wav",
    press_button: "press_button.wav",
    off_button: "off_button.wav",
    keep_going: "keep_going.wav",
    arrow_keys: "arrow_keys.wav"
};

export class FirstLevelManager {
    constructor(fireboy, watergirl, audioManager, allLevers, allButtons){
        this.fireboy = fireboy;
        this.watergirl = watergirl;
        this.audioManager = audioManager;
        this.audioManager.nextAudioForTimer(audioFiles.arrow_keys);
        this.yellowLever = allLevers[0];
        this.yellowRamp = this.yellowLever.ramp;
        this.firstPurpleButton = allButtons[0][0];
        this.secondPurpleButton = allButtons[0][1];
        this.purpleRamp = this.secondPurpleButton.ramp;
        
        this.fireCheckpoints = {
            beforeEncloseExitFire: false,
            beforeFirePool: false,
            betweenPools: false,
            afterWaterPool: false,
            firstHigherPlatform: false,
            beforeAcidPool: false,
            afterAcidPool: false,
            beforeLever: false,
            beforeLeverPlatform: false,
            onLeverPlatform: false,
            afterLeverPlatform: false,
            onFirstButton: false,
            onButtonPlatform: false,
            afterCubeDrop: false,
            halfwayCubeSliding: false,
            beforeCubeJump: false,
            onCube: false,
            afterCubeFire: false,
            beforeDoors: false
        };
        
        this.waterCheckpoints = {
            beforeEncloseExitFire: false,
            beforeFirePool: false,
            betweenPools: false,
            afterWaterPool: false,
            firstHigherPlatform: false,
            beforeAcidPool: false,
            afterAcidPool: false,
            beforeLever: false,
            beforeLeverPlatform: false,
            onLeverPlatform: false,
            afterLeverPlatform: false,
            onFirstButton: false,
            beforeButtonPlatform: false,
            onButtonPlatform: false,
            beforeCube: false,
            afterCubeDrop: false,
            halfwayCubeSliding: false,
            beforeCubeJump: false,
            onCube: false,
            afterCubeWater: false,
            atExit: false
        };
        
        this.coordinates = {
            startWater: {x: 47, y: 780},
            beforeEncloseExitFire: {x: 273, y: 911},
            beforeEncloseExitWater: {x: 273, y: 780},
            beforeFirePool: {x: 560, y: 851},
            betweenPools: {x: 833, y: 851},
            afterWaterPool: {x: 1128, y: 851},
            firstHigherPlatform: {x: 1265, y: 743},
            beforeAcidPool: {x: 1020, y: 635},
            afterAcidPool: {x: 708, y: 635},
            beforeLever: {x: 430, y: 573},
            beforeLeverPlatform: {x: 191, y: 573},
            onLeverPlatform: {x: 80, y: 555},
            afterLeverPlatform: {x: 212, y: 413},
            onFirstButton: {x: 359, y: 413},
            beforeButtonPlatform: {x: 1140, y: 479},
            onButtonPlatformLowered: {x: 1220, y: 448},
            onButtonPlatformLifted: {x: 1220, y: 340},
            onSecondButton: {x: 1031, y: 299},
            beforeCube: {x: 815, y: 227},
            afterCubeDrop: {x: 579, y: 299},
            halfwayCubeSliding: {x: 411, y: 299},
            beforeCubeJump: {x: 249, y: 299},
            onCube: {x: 185, y: 232},
            afterCubeFire: {x: 143, y: 155},
            afterCubeWater: {x: 46, y: 155},
            beforeDoors: {x: 357, y: 47},
            doorWater: {x: 1238, y: 119}
        };
    }
    
    markFireboyCheckpoints(){
        if (nearLocation(this.fireboy.position, this.coordinates.beforeEncloseExitFire)){
            this.fireCheckpoints.beforeEncloseExitFire = true;
        }
        if (nearLocation(this.fireboy.position, this.coordinates.beforeFirePool)){
            this.fireCheckpoints.beforeFirePool = true;
        }
        if (nearLocation(this.fireboy.position, this.coordinates.betweenPools)){
            this.fireCheckpoints.betweenPools = true;
        }
        if (nearLocation(this.fireboy.position, this.coordinates.afterWaterPool)){
            this.fireCheckpoints.afterWaterPool = true;
        }
        if (nearLocation(this.fireboy.position, this.coordinates.firstHigherPlatform)){
            this.fireCheckpoints.firstHigherPlatform = true;
        }
        if (nearLocation(this.fireboy.position, this.coordinates.beforeAcidPool)){
            this.fireCheckpoints.beforeAcidPool = true;
        }
        if (nearLocation(this.fireboy.position, this.coordinates.afterAcidPool)){
            this.fireCheckpoints.afterAcidPool = true;
        }
        if (nearLocation(this.fireboy.position, this.coordinates.beforeLever)){
            this.fireCheckpoints.beforeLever = true;
        }
        if (nearLocation(this.fireboy.position, this.coordinates.beforeLeverPlatform)){
            this.fireCheckpoints.beforeLeverPlatform = true;
        }
        if (nearLocation(this.fireboy.position, this.coordinates.onLeverPlatform)){
            this.fireCheckpoints.onLeverPlatform = true;
        }
        if (nearLocation(this.fireboy.position, this.coordinates.afterLeverPlatform)){
            this.fireCheckpoints.afterLeverPlatform = true;
        }
        if (nearLocation(this.fireboy.position, this.coordinates.onFirstButton)){
            this.fireCheckpoints.onFirstButton = true;
        }
        if (nearLocation(this.fireboy.position, this.coordinates.onButtonPlatformLowered)){
            this.fireCheckpoints.onButtonPlatform = true;
        }
        if (nearLocation(this.fireboy.position, this.coordinates.afterCubeDrop)){
            this.fireCheckpoints.afterCubeDrop = true;
        }
        if (nearLocation(this.fireboy.position, this.coordinates.halfwayCubeSliding)){
            this.fireCheckpoints.halfwayCubeSliding = true;
        }
        if (nearLocation(this.fireboy.position, this.coordinates.beforeCubeJump)){
            this.fireCheckpoints.beforeCubeJump = true;
        }
        if (nearLocation(this.fireboy.position, this.coordinates.onCube)){
            this.fireCheckpoints.onCube = true;
        }
        if (nearLocation(this.fireboy.position, this.coordinates.afterCubeFire)){
            this.fireCheckpoints.afterCubeFire = true;
        }
        if (nearLocation(this.fireboy.position, this.coordinates.beforeDoors)){
            this.fireCheckpoints.beforeDoors = true;
        }
    }

    markWatergirlCheckpointsAndStops(){
        if (nearLocation(this.watergirl.position, this.coordinates.beforeEncloseExitWater) && !this.waterCheckpoints.beforeEncloseExitWater){
            stopMoving(this.watergirl);
            this.waterCheckpoints.beforeEncloseExitWater = true;
        }
        if (nearLocation(this.watergirl.position, this.coordinates.beforeFirePool) && !this.waterCheckpoints.beforeFirePool){
            stopMoving(this.watergirl);
            this.waterCheckpoints.beforeFirePool = true;
            this.audioManager.playAudio(audioFiles.lava_ahead);
        }
        if (nearLocation(this.watergirl.position, this.coordinates.betweenPools) && !this.waterCheckpoints.betweenPools){
            stopMoving(this.watergirl);
            this.waterCheckpoints.betweenPools = true;
            this.audioManager.playAudio(audioFiles.made_jump);
        }
        if (nearLocation(this.watergirl.position, this.coordinates.afterWaterPool) && !this.waterCheckpoints.afterWaterPool){
            stopMoving(this.watergirl);
            this.waterCheckpoints.afterWaterPool = true;
        }
        if (nearLocation(this.watergirl.position, this.coordinates.firstHigherPlatform) && !this.waterCheckpoints.firstHigherPlatform){
            stopMoving(this.watergirl);
            this.waterCheckpoints.firstHigherPlatform = true;
            this.audioManager.playAudio(audioFiles.up_we_go);
        }
        if (nearLocation(this.watergirl.position, this.coordinates.beforeAcidPool) && !this.waterCheckpoints.beforeAcidPool){
            stopMoving(this.watergirl);
            this.waterCheckpoints.beforeAcidPool = true;
            this.audioManager.playAudio(audioFiles.acid_ahead);
        }
        if (nearLocation(this.watergirl.position, this.coordinates.afterAcidPool) && !this.waterCheckpoints.afterAcidPool){
            stopMoving(this.watergirl);
            this.waterCheckpoints.afterAcidPool = true;
            this.audioManager.playAudio(audioFiles.acid_not_scary);
        }
        if (nearLocation(this.watergirl.position, this.coordinates.beforeLever) && !this.waterCheckpoints.beforeLever){
            stopMoving(this.watergirl);
            this.waterCheckpoints.beforeLever = true;
            this.audioManager.playAudio(audioFiles.lever_does);
        }
        if (nearLocation(this.watergirl.position, this.coordinates.beforeLeverPlatform) && !this.waterCheckpoints.beforeLeverPlatform){
            stopMoving(this.watergirl);
            this.waterCheckpoints.beforeLeverPlatform = true;
        }
        if (nearLocation(this.watergirl.position, this.coordinates.onLeverPlatform) && !this.waterCheckpoints.onLeverPlatform){
            stopMoving(this.watergirl);
            this.waterCheckpoints.onLeverPlatform = true;
        }
        if (nearLocation(this.watergirl.position, this.coordinates.afterLeverPlatform) && !this.waterCheckpoints.afterLeverPlatform){
            stopMoving(this.watergirl);
            this.waterCheckpoints.afterLeverPlatform = true;
        }
        if (nearLocation(this.watergirl.position, this.coordinates.onFirstButton) && !this.waterCheckpoints.onFirstButton){
            stopMoving(this.watergirl);
            this.waterCheckpoints.onFirstButton = true;
            this.audioManager.playAudio(audioFiles.water_press_button);
        }
        if (nearLocation(this.watergirl.position, this.coordinates.beforeButtonPlatform) && !this.waterCheckpoints.beforeButtonPlatform){
            stopMoving(this.watergirl);
            this.waterCheckpoints.beforeButtonPlatform = true;
            this.audioManager.playAudio(audioFiles.keep_button_pressed);
        }
        if (nearLocation(this.watergirl.position, this.coordinates.onButtonPlatformLowered) && !this.waterCheckpoints.onButtonPlatform){
            stopMoving(this.watergirl);
            this.waterCheckpoints.onButtonPlatform = true;
        }
        if (nearLocation(this.watergirl.position, this.coordinates.beforeCube) && !this.waterCheckpoints.beforeCube){
            stopMoving(this.watergirl);
            this.waterCheckpoints.beforeCube = true;
            this.audioManager.playAudio(audioFiles.block_strong);
        }
        if (nearLocation(this.watergirl.position, this.coordinates.afterCubeDrop) && !this.waterCheckpoints.afterCubeDrop){
            stopMoving(this.watergirl);
            this.waterCheckpoints.afterCubeDrop = true;
        }
        if (nearLocation(this.watergirl.position, this.coordinates.halfwayCubeSliding) && !this.waterCheckpoints.halfwayCubeSliding){
            stopMoving(this.watergirl);
            this.waterCheckpoints.halfwayCubeSliding = true;
            this.audioManager.playAudio(audioFiles.finish_line);
        }
        if (nearLocation(this.watergirl.position, this.coordinates.beforeCubeJump) && !this.waterCheckpoints.beforeCubeJump){
            stopMoving(this.watergirl);
            this.waterCheckpoints.beforeCubeJump = true;
        }
        if (nearLocation(this.watergirl.position, this.coordinates.onCube) && !this.waterCheckpoints.onCube){
            stopMoving(this.watergirl);
            this.waterCheckpoints.onCube = true;
        }
        if (nearLocation(this.watergirl.position, this.coordinates.afterCubeWater) && !this.waterCheckpoints.afterCubeWater){
            stopMoving(this.watergirl);
            this.waterCheckpoints.afterCubeWater = true;
            this.audioManager.playAudio(audioFiles.diamonds);
        }
        if (nearLocation(this.watergirl.position, this.coordinates.doorWater) && !this.waterCheckpoints.atExit){
            stopMoving(this.watergirl);
            this.waterCheckpoints.atExit = true;
            this.audioManager.playAudio(audioFiles.teamwork);
        }
    }

    controlWatergirlMovement(){
        if (nearLocation(this.watergirl.position, this.coordinates.startWater) && this.fireCheckpoints.beforeEncloseExitFire){
            moveRight(this.watergirl);
            this.audioManager.playAudio(audioFiles.you_got_it);
        }
        if (nearLocation(this.watergirl.position, this.coordinates.beforeEncloseExitWater) && this.fireCheckpoints.beforeFirePool){
            moveRight(this.watergirl);
        }
        if (nearLocation(this.watergirl.position, this.coordinates.beforeFirePool) && this.fireCheckpoints.betweenPools && this.watergirl.isOnBlock){
            moveRight(this.watergirl);
            makeJump(this.watergirl);
        }
        if (nearLocation(this.watergirl.position, this.coordinates.betweenPools) && this.fireCheckpoints.afterWaterPool){
            moveRight(this.watergirl);
            this.audioManager.playAudio(audioFiles.nice_jump);
        }
        if (nearLocation(this.watergirl.position, this.coordinates.afterWaterPool) && this.fireCheckpoints.firstHigherPlatform && this.watergirl.isOnBlock){
            moveRight(this.watergirl);
            makeJump(this.watergirl);
        }
        if (nearLocation(this.watergirl.position, this.coordinates.firstHigherPlatform) && this.fireCheckpoints.beforeAcidPool && this.watergirl.isOnBlock){
            moveLeft(this.watergirl);
            makeJump(this.watergirl);
        }
        if (nearLocation(this.watergirl.position, this.coordinates.beforeAcidPool) && this.fireCheckpoints.afterAcidPool && this.watergirl.isOnBlock){
            moveLeft(this.watergirl);
            makeJump(this.watergirl);
        }
        if (nearLocation(this.watergirl.position, this.coordinates.afterAcidPool) && this.fireCheckpoints.beforeLever && this.watergirl.isOnBlock){
            moveLeft(this.watergirl);
            makeJump(this.watergirl);
        }
        if (nearLocation(this.watergirl.position, this.coordinates.beforeLever) && this.fireCheckpoints.beforeLeverPlatform && this.watergirl.isOnBlock){
            moveLeft(this.watergirl);
            makeJump(this.watergirl);
        }
        if (nearLocation(this.watergirl.position, this.coordinates.beforeLeverPlatform) && this.fireCheckpoints.onLeverPlatform && this.watergirl.isOnBlock && this.yellowRamp.position.y == this.yellowRamp.finalPosition.y){
            moveLeft(this.watergirl);
            makeJump(this.watergirl);
        }
        if (nearLocation(this.watergirl.position, this.coordinates.onLeverPlatform) && this.fireCheckpoints.afterLeverPlatform && this.watergirl.isOnBlock){
            moveRight(this.watergirl);
            makeJump(this.watergirl);
            this.audioManager.playAudio(audioFiles.doing_great);
        }
        if (nearLocation(this.watergirl.position, this.coordinates.afterLeverPlatform) && this.fireCheckpoints.onFirstButton){
            moveRight(this.watergirl);
        }
        if (nearLocation(this.watergirl.position, this.coordinates.onFirstButton) && this.fireCheckpoints.onButtonPlatform){
            moveRight(this.watergirl);
            this.audioManager.playAudio(audioFiles.wait);
        }
        if (nearLocation(this.watergirl.position, this.coordinates.beforeButtonPlatform) && this.purpleRamp.position.y == this.purpleRamp.finalPosition.y){
            moveRight(this.watergirl);
            makeJump(this.watergirl);
        }
        if (nearLocation(this.watergirl.position, this.coordinates.onButtonPlatformLifted)){
            moveLeft(this.watergirl);
            makeJump(this.watergirl);
        }
        if (nearLocation(this.watergirl.position, this.coordinates.beforeCube) && this.fireCheckpoints.afterCubeDrop){
            moveLeft(this.watergirl);
        }
        if (nearLocation(this.watergirl.position, this.coordinates.afterCubeDrop) && this.fireCheckpoints.halfwayCubeSliding){
            moveLeft(this.watergirl);
        }
        if (nearLocation(this.watergirl.position, this.coordinates.halfwayCubeSliding) && this.fireCheckpoints.beforeCubeJump){
            moveLeft(this.watergirl);
        }
        if (nearLocation(this.watergirl.position, this.coordinates.beforeCubeJump) && this.fireCheckpoints.onCube){
            moveLeft(this.watergirl);
            makeJump(this.watergirl);
        }
        if (nearLocation(this.watergirl.position, this.coordinates.onCube) && this.fireCheckpoints.afterCubeFire && this.watergirl.isOnBlock){
            moveLeft(this.watergirl);
            makeJump(this.watergirl);
        }
        if (nearLocation(this.watergirl.position, this.coordinates.afterCubeWater) && this.fireCheckpoints.beforeDoors && this.watergirl.isOnBlock){
            moveRight(this.watergirl);
            makeJump(this.watergirl);
        }
        if (nearLocation(this.watergirl.position, this.coordinates.beforeDoors)){
            this.audioManager.playAudio(audioFiles.spot_exit);
        }
    }

    checkForLevelStateActions(){
        if (this.fireCheckpoints.beforeLeverPlatform && !this.yellowLever.pressed){
            this.audioManager.nextAudioForTimer(audioFiles.lever_important);
        }
        if (nearLocation(this.watergirl.position, this.coordinates.beforeButtonPlatform) && !this.secondPurpleButton.pressed){
            this.audioManager.nextAudioForTimer(audioFiles.press_button);
        }
    }

    //returns array of all the checkpoints for fb and wg
    get_checkpoints_to_mark_on_screen(){
        var screen_checkpoints = []
        // Mark fireboy and shared checkpoints
        for (const checkpoint in this.fireCheckpoints){
            if(checkpoint in this.coordinates){
                if (checkpoint in this.waterCheckpoints){
                    screen_checkpoints.push(createCheckpoint(this.coordinates[checkpoint]['x'], this.coordinates[checkpoint]['y'], './res/img/both_checkpoint.png'))
                }else{
                    screen_checkpoints.push(createCheckpoint(this.coordinates[checkpoint]['x'], this.coordinates[checkpoint]['y'], './res/img/fire_checkpoint.png'))
                }
            }
        }
        // Mark watergirl checkpoints and not shared
        for (const checkpoint in this.waterCheckpoints){
            if (checkpoint in this.coordinates && !(checkpoint in this.fireCheckpoints)){
                screen_checkpoints.push(createCheckpoint(this.coordinates[checkpoint]['x'], this.coordinates[checkpoint]['y'], './res/img/water_checkpoint.png'))
            }
        }
        return screen_checkpoints;
    }
}
