import { 
    nearLocation,
    moveRight,
    moveLeft,
    stopMoving,
    makeJump
} from "./helperFunctions.js";

let audioFiles = {
    together: "together.wav",
    down_or_right: "down_or_right.wav",
    pick_path: "pick_path.wav",
    take_other: "take_other.wav",
    get_diamonds: "get_diamonds.wav",
    come_down: "come_down.wav",
    push_balls: "push_balls.wav",
    restart: "restart.wav",
    go_right: "go_right.wav",
    platform_up: "platform_up.wav",
    go_down: "go_down.wav",
    long_way: "long_way.wav",
    unlocked_door: "unlocked_door.wav",
    thanks_door: "thanks_door.wav",
    excellent: "excellent.wav",
    lift_platform: "lift_platform.wav",
};

export class FifthLevelManager {
    constructor(fireboy, watergirl, audioManager, allButtons, allLevers, allBalls){
        this.fireboy = fireboy;
        this.watergirl = watergirl;
        this.audioManager = audioManager;
        this.audioManager.nextAudioForTimer([audioFiles.together, audioFiles.down_or_right, audioFiles.pick_path, audioFiles.take_other]);
        this.blueButton = allButtons[0][0];
        this.whiteButton = allButtons[1][0];
        this.greenLever = allLevers[0];
        this.redLever = allLevers[1];
        this.lowerBall = allBalls[0];
        this.upperBall = allBalls[1];
        
        this.fireCheckpoints = {
            toBalls: false,
            dropped: false,
            unlockedRed: false,
        };
        
        this.waterCheckpoints = {
            diamondTurnAround: false,
            dropToDoors: false,
            lowerLevelsDrop: false,
            greenLeverDrop: false,
            rightOfGreenLever: false,
            exitingGreenLeverJump: false,
            lowerLevelExitJump: false,
            betweenDoors: false,
            waterDoor: false,
            upperBall: false,
            lowerBallDrop: false,
            lowerBallWait: false,
            lowerBall: false,
            pushBalls: false,
            pathUnlocked: false,
            restart: false,
            unlockedGreen: false,
            end: false,
        };
        
        this.coordinates = {
            waterStart: {x: 116, y: 118},
            fireboyDropped: {x: 218, y: 266},
            fireboyToBalls: {x: 587, y: 85},
            leftOfFirepool: {x: 506, y: 118},
            rightOfFirepool: {x: 651, y: 118},
            secondDiamondInWater: {x: 783, y: 136},
            rightOfWaterpool: {x: 871, y: 118},
            upperBall: {x: 1228, y: 118},
            beforeSpike: {x: 1171, y: 118},
            lowerBallDrop: {x: 980, y: 78},
            afterLowerBallDrop: {x: 979, y: 334},
            lowerBall: {x: 1104.99, y: 334},
            underWaterpool: {x: 905, y: 226},
            leftOfFireDoor: {x: 220, y: 360},
            dropToDoors: {x: 77, y: 396},
            afterDropToDoors: {x: 79, y: 514},
            underFireDoor: {x: 400, y: 550},
            beforeWhitePlatform: {x: 622, y: 423},
            lowerLevelsDrop: {x: 985, y: 508},
            afterLowerLevelsDrop: {x: 985, y: 622},
            avoidLowerLavaJumpToLeft: {x: 859, y: 658},
            avoidLowerLavaJumpToRight: {x: 738, y: 694},
            greenLeverDrop: {x: 60, y: 729},
            afterGreenLeverDrop: {x: 77, y: 965},
            rightOfGreenLever: {x: 256, y: 965},
            atGreenLever: {x: 170, y: 965},
            exitingGreenLeverJump: {x: 5, y: 838},
            twoStepsJump: {x: 940, y: 658},
            lowerLevelExitJump: {x: 1084, y: 586},
            betweenDoors: {x: 568, y: 406},
            waterDoor: {x: 780, y: 300},
            fireDoor: {x: 395, y: 300},
        };
    }

    markFireboyCheckpoints(){
        if (nearLocation(this.fireboy.position, this.coordinates.fireboyDropped) && !this.fireCheckpoints.dropped && !this.fireCheckpoints.toBalls){
            this.audioManager.playAudio(audioFiles.go_right);
            this.fireCheckpoints.dropped = true;
        }
        if (nearLocation(this.fireboy.position, this.coordinates.fireboyToBalls) && !this.fireCheckpoints.toBalls && !this.fireCheckpoints.dropped){
            this.audioManager.playAudio(audioFiles.get_diamonds);
            this.fireCheckpoints.toBalls = true;
        }
        if (this.redLever.pressed && !this.fireCheckpoints.unlockedRed){
            this.audioManager.playAudio(audioFiles.thanks_door);
            this.fireCheckpoints.unlockedRed = true;
        }
    }

    markWatergirlCheckpointsAndStops(){
        if (nearLocation(this.watergirl.position, this.coordinates.secondDiamondInWater) && !this.waterCheckpoints.diamondTurnAround &&
           this.fireCheckpoints.toBalls){
            stopMoving(this.watergirl);
            this.waterCheckpoints.diamondTurnAround = true;
        }
        if (nearLocation(this.watergirl.position, this.coordinates.dropToDoors) && !this.waterCheckpoints.dropToDoors){
            stopMoving(this.watergirl);
            this.waterCheckpoints.dropToDoors = true;
        }
        if (nearLocation(this.watergirl.position, this.coordinates.lowerLevelsDrop) && !this.waterCheckpoints.lowerLevelsDrop){
            stopMoving(this.watergirl);
            this.waterCheckpoints.lowerLevelsDrop = true;
        }
        if (nearLocation(this.watergirl.position, this.coordinates.greenLeverDrop) && !this.waterCheckpoints.greenLeverDrop){
            stopMoving(this.watergirl);
            this.waterCheckpoints.greenLeverDrop = true;
        }
        if (nearLocation(this.watergirl.position, this.coordinates.rightOfGreenLever) && !this.waterCheckpoints.rightOfGreenLever){
            stopMoving(this.watergirl);
            this.waterCheckpoints.rightOfGreenLever = true;
        }
        if (nearLocation(this.watergirl.position, this.coordinates.exitingGreenLeverJump) && !this.waterCheckpoints.exitingGreenLeverJump){
            stopMoving(this.watergirl);
            this.waterCheckpoints.exitingGreenLeverJump = true;
        }
        if (nearLocation(this.watergirl.position, this.coordinates.lowerLevelExitJump) && !this.waterCheckpoints.lowerLevelExitJump){
            stopMoving(this.watergirl);
            this.waterCheckpoints.lowerLevelExitJump = true;
        }
        if (nearLocation(this.watergirl.position, this.coordinates.betweenDoors) && !this.waterCheckpoints.betweenDoors &&
           this.greenLever.pressed){
            stopMoving(this.watergirl);
            this.waterCheckpoints.betweenDoors = true;
        }
        if (nearLocation(this.watergirl.position, this.coordinates.waterDoor) && !this.waterCheckpoints.waterDoor){
            stopMoving(this.watergirl);
            this.waterCheckpoints.waterDoor = true;
        }
        if (nearLocation(this.watergirl.position, this.coordinates.upperBall) && !this.waterCheckpoints.upperBall){
            stopMoving(this.watergirl);
            this.audioManager.playAudio(audioFiles.lift_platform);
            this.waterCheckpoints.upperBall = true;
        }
        if (nearLocation(this.watergirl.position, this.coordinates.lowerBallDrop) && !this.waterCheckpoints.lowerBallDrop &&
           this.waterCheckpoints.upperBall){
            stopMoving(this.watergirl);
            this.waterCheckpoints.lowerBallDrop = true;
        }
        if (nearLocation(this.watergirl.position, this.coordinates.lowerBall) && !this.waterCheckpoints.lowerBall){
            stopMoving(this.watergirl);
            this.waterCheckpoints.lowerBall = true;
        }
    }
    
    controlWatergirlMovement(){
        if (nearLocation(this.watergirl.position, this.coordinates.waterStart) && (this.fireCheckpoints.dropped || this.fireCheckpoints.toBalls)){
            moveRight(this.watergirl);
            makeJump(this.watergirl);
        }
        if (nearLocation(this.watergirl.position, this.coordinates.leftOfFirepool) && !this.waterCheckpoints.lowerBall && this.watergirl.isOnBlock){
            makeJump(this.watergirl);
        }
        if (nearLocation(this.watergirl.position, this.coordinates.secondDiamondInWater) && this.watergirl.isOnBlock && this.fireCheckpoints.toBalls){
            moveLeft(this.watergirl);
            makeJump(this.watergirl);
        }
        if (nearLocation(this.watergirl.position, this.coordinates.rightOfWaterpool) && !this.waterCheckpoints.lowerBall && this.watergirl.isOnBlock){
            makeJump(this.watergirl);
        }
        if (nearLocation(this.watergirl.position, this.coordinates.upperBall) && this.watergirl.isOnBlock){
            moveLeft(this.watergirl);
            makeJump(this.watergirl);
        }
        if (nearLocation(this.watergirl.position, this.coordinates.afterLowerBallDrop) && !this.waterCheckpoints.lowerBall &&
           !this.waterCheckpoints.lowerBallWait){
            setTimeout(() => moveRight(this.watergirl), 2000);
            this.waterCheckpoints.lowerBallWait = true;
        }
        if (nearLocation(this.watergirl.position, this.coordinates.lowerBall)){
            moveLeft(this.watergirl);
        }
        if (nearLocation(this.watergirl.position, this.coordinates.afterLowerBallDrop) && this.waterCheckpoints.lowerBall && this.watergirl.isOnBlock){
            makeJump(this.watergirl);
        }
        if (nearLocation(this.watergirl.position, this.coordinates.underWaterpool) && this.waterCheckpoints.lowerBall && this.watergirl.isOnBlock){
            makeJump(this.watergirl);
        }
        if (nearLocation(this.watergirl.position, this.coordinates.rightOfFirepool) && this.waterCheckpoints.lowerBall && this.watergirl.isOnBlock){
            makeJump(this.watergirl);
        }
        if (nearLocation(this.watergirl.position, this.coordinates.leftOfFireDoor)){
            moveLeft(this.watergirl);
        }
        if (nearLocation(this.watergirl.position, this.coordinates.afterDropToDoors)){
            moveRight(this.watergirl);
        }
        if (nearLocation(this.watergirl.position, this.coordinates.underFireDoor) && this.watergirl.isOnBlock){
            makeJump(this.watergirl);
        }
        if (nearLocation(this.watergirl.position, this.coordinates.afterLowerLevelsDrop) && !this.greenLever.pressed){
            moveLeft(this.watergirl);
        }
        if (nearLocation(this.watergirl.position, this.coordinates.avoidLowerLavaJumpToLeft) && !this.greenLever.pressed && this.watergirl.isOnBlock){
            makeJump(this.watergirl);
        }
        if (nearLocation(this.watergirl.position, this.coordinates.afterGreenLeverDrop) && !this.greenLever.pressed){
            moveRight(this.watergirl);
        }
        if (nearLocation(this.watergirl.position, this.coordinates.rightOfGreenLever)){
            moveLeft(this.watergirl);
        }
        if (nearLocation(this.watergirl.position, this.coordinates.atGreenLever) && this.watergirl.isOnBlock){
            makeJump(this.watergirl);
        }
        if (nearLocation(this.watergirl.position, this.coordinates.afterGreenLeverDrop) && this.greenLever.pressed && this.watergirl.isOnBlock){
            this.audioManager.playAudio(audioFiles.unlocked_door);
            makeJump(this.watergirl);
        }
        if (nearLocation(this.watergirl.position, this.coordinates.exitingGreenLeverJump) && this.watergirl.isOnBlock){
            moveRight(this.watergirl);
            makeJump(this.watergirl);
        }
        if (nearLocation(this.watergirl.position, this.coordinates.avoidLowerLavaJumpToRight) && this.greenLever.pressed && this.watergirl.isOnBlock){
            makeJump(this.watergirl);
        }
        if (nearLocation(this.watergirl.position, this.coordinates.twoStepsJump) && this.greenLever.pressed && this.watergirl.isOnBlock){
            makeJump(this.watergirl);
        }
        if (nearLocation(this.watergirl.position, this.coordinates.lowerLevelExitJump) && this.greenLever.pressed && this.watergirl.isOnBlock){
            moveLeft(this.watergirl);
            makeJump(this.watergirl);
        }
        if (nearLocation(this.watergirl.position, this.coordinates.betweenDoors) &&
            nearLocation(this.redLever.ramp.position, this.redLever.ramp.finalPosition) && this.greenLever.pressed){
            moveRight(this.watergirl);
            makeJump(this.watergirl);
        }
    }

    checkForLevelStateActions(){
        if (nearLocation(this.watergirl.position, this.coordinates.beforeWhitePlatform) && this.fireCheckpoints.toBalls && !this.waterCheckpoints.pushBalls &&
           (nearLocation(this.lowerBall.position, this.coordinates.lowerBall) && nearLocation(this.upperBall.position, this.coordinates.upperBall))){
            this.audioManager.playAudio(audioFiles.push_balls);
            this.waterCheckpoints.pushBalls = true;
        }
        if (this.whiteButton.pressed && this.fireCheckpoints.toBalls && !this.waterCheckpoints.pathUnlocked){
            //this.audioManager.playAudioPA(audioFiles.come_down, "mid_acknowledgment");
            this.audioManager.playAudio(audioFiles.come_down, true, "mid_acknowledgment");
            this.waterCheckpoints.pathUnlocked = true;
        }
        if (nearLocation(this.whiteButton.ramp.position, this.whiteButton.ramp.finalPosition) && this.fireCheckpoints.dropped && !this.waterCheckpoints.pathUnlocked){
            this.audioManager.playAudio(audioFiles.go_down);
            this.waterCheckpoints.pathUnlocked = true;
        }
        if (nearLocation(this.lowerBall.position, this.blueButton.position) && 
            nearLocation(this.upperBall.position, this.blueButton.position) && !this.waterCheckpoints.restart){
            this.audioManager.playAudio(audioFiles.restart);
            this.waterCheckpoints.restart = true;
        }
        if (nearLocation(this.watergirl.position, this.coordinates.dropToDoors) && this.fireCheckpoints.dropped){
            this.audioManager.playAudio(audioFiles.long_way);
        }
        if (nearLocation(this.watergirl.position, this.coordinates.waterDoor) &&
           nearLocation(this.fireboy.position, this.coordinates.fireDoor) && !this.waterCheckpoints.end){
            //this.audioManager.playAudioPA(audioFiles.excellent, "greater_acknowledgment");
            this.audioManager.playAudio(audioFiles.excellent, true, "greater_acknowledgment");
            this.waterCheckpoints.end = true;
        }
    }
}
