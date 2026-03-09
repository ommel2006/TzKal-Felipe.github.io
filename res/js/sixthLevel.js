import { 
    nearLocation,
    moveRight,
    moveLeft,
    stopMoving,
    makeJump,
    isMovingRight,
    isMovingLeft
} from "./helperFunctions.js";

let audioFiles = {
    confusing: "confusing.wav",
    think_this: "think_this.wav",
    push_ball: "push_ball.wav",
    push_right: "push_right.wav",
    right_correct: "right_correct.wav",
    push_second: "push_second.wav",
    push_third: "push_third.wav",
    down_go: "down_go.wav",
    push_blue_button: "push_blue_button.wav",
    need_lever: "need_lever.wav",
    fun_up_there: "fun_up_there.wav",
    keep_pressed: "keep_pressed.wav",
    got_diamond: "got_diamond.wav",
    thanks_come: "thanks_come.wav",
    faster: "faster.wav",
    lift: "lift.wav",
    ball_stuck: "ball_stuck.wav",
    let_me_out: "let_me_out.wav",
    no_fall_damage: "no_fall_damage.wav",
    almost_done: "almost_done.wav",
    sorry_you_stay: "sorry_you_stay.wav",
    dont_fit: "dont_fit.wav",
    dont_come_down_yet: "dont_come_down_yet.wav"
};

export class SixthLevelManager {
    constructor(fireboy, watergirl, audioManager, allButtons, allLevers, allBalls){
        this.fireboy = fireboy;
        this.watergirl = watergirl;
        this.audioManager = audioManager;
        this.audioManager.nextAudioForTimer([audioFiles.confusing, audioFiles.think_this, audioFiles.push_ball, audioFiles.push_right, audioFiles.right_correct]);
        this.blueButton = allButtons[0][0];
        this.redButton = allButtons[1][0];
        this.greenButton = allButtons[2][0];
        this.purpleButton = allButtons[3][0];
        this.greyLever = allLevers[0];
        this.leftBall = allBalls[0];
        this.middleBall = allBalls[1];
        this.rightBall = allBalls[2];
        
        this.fireCheckpoints = {
            firstBallPushed: false,
            secondBallPushed: false,
            dontComeDown: false,
            stayUpThere: false,
            noFallDamage: false,
            almostDone: false,
            whatTookLong: false
        };
        
        this.waterCheckpoints = {
            bothBallsStuck: false,
            dropBeforeLeftBall: false,
            leftBallPush: false,
            dropAfterLeftBall: false,
            belowLeverPlatform: false,
            afterDrop1: false,
            leverPush: false,
            bottomRightStop: false,
            bottomRightJump: false,
            afterBlueBarrier: false,
            diamondStop: false,
            bottomRightSecondStop: false,
            liftPlatform: false,
            letMeOut: false,
            waterDoor: false
        };
        
        this.coordinates = {
            leftBallStart: {x: 355, y: 200},
            middleBallStart: {x: 630, y: 200},
            rightBallStart: {x: 1200, y: 30},
            watergirlStart: {x: 530, y: 47},
            duringDropBeforeLeftBall: {x: 100, y: 130},
            afterDropBeforeLeftBall: {x: 100, y: 263},
            noFallDamage: {x: 171, y: 297},
            atLeftBallPush: {x: 320, y: 155},
            beforeDrop1: {x: 237, y: 300},
            afterDrop1: {x: 237, y: 400},
            beforeDrop2: {x: 30, y: 410},
            afterDrop2: {x: 30, y: 550},
            beforeDrop3: {x: 120, y: 520},
            afterDrop3: {x: 120, y: 700},
            beforeDrop4: {x: 25, y: 740},
            afterDrop4: {x: 25, y: 840},
            belowLeverPlatform: {x: 660, y: 910},
            atLeverStop: {x: 485, y: 750},
            atLeverMove: {x: 500, y: 750},
            bottomRight: {x: 1320, y: 887},
            beforeBlueBarrier: {x: 1189, y: 738},
            exitingBlueBarrier: {x: 1119, y: 730},
            afterBlueBarrier: {x: 1045, y: 730},
            diamond: {x: 860, y: 730},
            afterDiamondRetrieved: {x: 985, y: 730},
            fireDoor: {x: 866, y: 910},
            waterDoor: {x: 955, y: 910}
        };
    }

    markFireboyCheckpoints(){
        if (!nearLocation(this.middleBall.position, this.coordinates.middleBallStart) ||
            !nearLocation(this.rightBall.position, this.coordinates.rightBallStart)){
            
            this.fireCheckpoints.firstBallPushed = true;
        }
        if (!nearLocation(this.middleBall.position, this.coordinates.middleBallStart) &&
            !nearLocation(this.rightBall.position, this.coordinates.rightBallStart)){
            
            this.fireCheckpoints.secondBallPushed = true;
        }
        if (nearLocation(this.fireboy.position, this.coordinates.watergirlStart) &&
           !this.fireCheckpoints.dontComeDownYet && !this.waterCheckpoints.diamondStop &&
           !this.waterCheckpoints.afterDrop1){

            this.fireCheckpoints.dontComeDownYet = true;
            this.audioManager.playAudio(audioFiles.dont_come_down_yet);
        }
        if (nearLocation(this.fireboy.position, this.coordinates.watergirlStart) &&
           !this.fireCheckpoints.stayUpThere && this.waterCheckpoints.afterDrop1 &&
           !this.waterCheckpoints.diamondStop){

            this.fireCheckpoints.stayUpThere = true;
            this.audioManager.playAudio(audioFiles.sorry_you_stay);
        }
        if (nearLocation(this.fireboy.position, this.coordinates.noFallDamage) &&
           !this.fireCheckpoints.noFallDamage){

            this.fireCheckpoints.noFallDamage = true;
            this.audioManager.playAudio(audioFiles.no_fall_damage);
        }
        if (nearLocation(this.fireboy.position, this.coordinates.afterDrop4) &&
           !this.fireCheckpoints.almostDone){

            this.fireCheckpoints.almostDone = true;
            this.audioManager.playAudio(audioFiles.almost_done);
        }
        if (nearLocation(this.fireboy.position, this.coordinates.fireDoor) &&
           !this.fireCheckpoints.whatTookLong){

            this.fireCheckpoints.whatTookLong = true;
        }
    }

    markWatergirlCheckpointsAndStops(){
        if (nearLocation(this.watergirl.position, this.coordinates.duringDropBeforeLeftBall) &&
            !this.waterCheckpoints.dropBeforeLeftBall){

            stopMoving(this.watergirl);
            this.waterCheckpoints.dropBeforeLeftBall = true;
        }
        if (nearLocation(this.watergirl.position, this.coordinates.atLeftBallPush) &&
            !this.waterCheckpoints.leftBallPush){

            stopMoving(this.watergirl);
            this.waterCheckpoints.leftBallPush = true;
        }
        if (nearLocation(this.watergirl.position, this.coordinates.afterDropBeforeLeftBall) &&
            !this.waterCheckpoints.dropAfterLeftBall && this.waterCheckpoints.leftBallPush){

            stopMoving(this.watergirl);
            this.waterCheckpoints.dropAfterLeftBall = true;
        }
        if (nearLocation(this.watergirl.position, this.coordinates.beforeDrop1)){
            stopMoving(this.watergirl);
        }
        if (nearLocation(this.watergirl.position, this.coordinates.beforeDrop2)){
            stopMoving(this.watergirl);
        }
        if (nearLocation(this.watergirl.position, this.coordinates.beforeDrop3)){
            stopMoving(this.watergirl);
        }
        if (nearLocation(this.watergirl.position, this.coordinates.beforeDrop4)){
            stopMoving(this.watergirl);
        }
        if (nearLocation(this.watergirl.position, this.coordinates.belowLeverPlatform) &&
            !this.waterCheckpoints.belowLeverPlatform){
            
            stopMoving(this.watergirl);
            this.waterCheckpoints.belowLeverPlatform = true;
        }
        if (nearLocation(this.watergirl.position, this.coordinates.atLeverStop) &&
            !this.waterCheckpoints.leverPush){
            
            stopMoving(this.watergirl);
            this.waterCheckpoints.leverPush = true;
        }
        if (nearLocation(this.watergirl.position, this.coordinates.bottomRight) &&
            !this.waterCheckpoints.bottomRightStop){
            
            stopMoving(this.watergirl);
            this.waterCheckpoints.bottomRightStop = true;
        }
        if (nearLocation(this.watergirl.position, this.coordinates.diamond) &&
            !this.waterCheckpoints.diamondStop){
            
            stopMoving(this.watergirl);
            this.waterCheckpoints.diamondStop = true;
        }
        if (nearLocation(this.watergirl.position, this.coordinates.bottomRight) &&
            this.waterCheckpoints.diamondStop && !this.waterCheckpoints.bottomRightSecondStop){
            
            stopMoving(this.watergirl);
            this.waterCheckpoints.bottomRightSecondStop = true;
        }
        if (nearLocation(this.watergirl.position, this.coordinates.waterDoor) &&
            this.waterCheckpoints.diamondStop && !this.waterCheckpoints.waterDoor){
            this.waterCheckpoints.waterDoor = true;
            this.audioManager.playAudio(audioFiles.faster);
            stopMoving(this.watergirl);
        }
    }

    controlWatergirlMovement(){
        if (nearLocation(this.watergirl.position, this.coordinates.watergirlStart) &&
            this.fireCheckpoints.firstBallPushed){
            this.audioManager.playAudio(audioFiles.push_second);
            moveLeft(this.watergirl);
        }
        if (nearLocation(this.watergirl.position, this.coordinates.afterDropBeforeLeftBall) &&
            this.fireCheckpoints.secondBallPushed && !this.waterCheckpoints.leftBallPush){
            this.audioManager.playAudio(audioFiles.push_third);
            makeJump(this.watergirl);
            moveRight(this.watergirl);
        }
        if (nearLocation(this.watergirl.position, this.coordinates.atLeftBallPush) &&
            this.waterCheckpoints.leftBallPush){

            moveLeft(this.watergirl);
        }
        if (nearLocation(this.watergirl.position, this.coordinates.afterDropBeforeLeftBall) &&
            this.waterCheckpoints.leftBallPush){

            moveRight(this.watergirl);
        }
        if (nearLocation(this.watergirl.position, this.coordinates.afterDrop1)){
            this.audioManager.playAudio(audioFiles.down_go);
            this.waterCheckpoints.afterDrop1 = true;
            moveLeft(this.watergirl);
        }
        if (nearLocation(this.watergirl.position, this.coordinates.afterDrop2)){
            moveRight(this.watergirl);
        }
        if (nearLocation(this.watergirl.position, this.coordinates.afterDrop3)){
            moveLeft(this.watergirl);
        }
        if (nearLocation(this.watergirl.position, this.coordinates.afterDrop4)){
            moveRight(this.watergirl);
            this.audioManager.playAudio(audioFiles.push_blue_button);
        }
        if (nearLocation(this.watergirl.position, this.coordinates.belowLeverPlatform) &&
            nearLocation(this.purpleButton.ramp.position, this.purpleButton.ramp.finalPosition, undefined, 10) && 
            !this.greyLever.pressed){
            this.audioManager.playAudio(audioFiles.need_lever);
            makeJump(this.watergirl);
            moveLeft(this.watergirl);
        }
        if (nearLocation(this.watergirl.position, this.coordinates.atLeverMove) &&
            this.greyLever.pressed){
            
            moveRight(this.watergirl);
        }
        if (nearLocation(this.watergirl.position, this.coordinates.bottomRight) &&
            !this.waterCheckpoints.bottomRightJump){
            makeJump(this.watergirl);
            moveLeft(this.watergirl);
            this.waterCheckpoints.bottomRightJump = true;
        }
        if (nearLocation(this.watergirl.position, this.coordinates.afterBlueBarrier) &&
            !this.waterCheckpoints.afterBlueBarrier){
            
            makeJump(this.watergirl);
            this.waterCheckpoints.afterBlueBarrier = true;
        }
        if (nearLocation(this.watergirl.position, this.coordinates.diamond)){
            this.audioManager.playAudio(audioFiles.got_diamond);
            moveRight(this.watergirl);
        }
        if (nearLocation(this.watergirl.position, this.coordinates.afterDiamondRetrieved) &&
            this.waterCheckpoints.diamondStop){
            makeJump(this.watergirl);
        }
        if (nearLocation(this.watergirl.position, this.coordinates.bottomRight) &&
            this.waterCheckpoints.diamondStop){
            
            moveLeft(this.watergirl);
        }
    }

    checkForLevelStateActions(){
        if (nearLocation(this.watergirl.position, this.coordinates.waterDoor) &&
            !this.waterCheckpoints.diamondStop){
            this.audioManager.playAudio(audioFiles.fun_up_there);
        }
        if (nearLocation(this.watergirl.position, this.coordinates.beforeBlueBarrier) &&
            this.blueButton.pressed &&
            !this.waterCheckpoints.diamondStop){
            this.audioManager.playAudio(audioFiles.keep_pressed);
            console.log("tried to play keep_pressed.wav");
        }
        if (nearLocation(this.watergirl.position, this.coordinates.beforeBlueBarrier) &&
            !nearLocation(this.blueButton.ramp.position, this.blueButton.ramp.finalPosition) &&
            !this.waterCheckpoints.diamondStop && !this.waterCheckpoints.liftPlatform){
            this.waterCheckpoints.liftPlatform = true;
            this.audioManager.playAudio(audioFiles.lift);
            console.log("tried to play lift.wav");
        }
        if (nearLocation(this.watergirl.position, this.coordinates.beforeBlueBarrier) &&
            this.waterCheckpoints.diamondStop){
            this.audioManager.playAudio(audioFiles.thanks_come);
            console.log("tried to play thanks_come.wav");
        }
        if (nearLocation(this.watergirl.position, this.coordinates.exitingBlueBarrier) &&
            nearLocation(this.blueButton.ramp.position, this.blueButton.ramp.startPosition) &&
            this.waterCheckpoints.diamondStop && !this.waterCheckpoints.letMeOut){
            this.waterCheckpoints.letMeOut = true;
            this.audioManager.playAudio(audioFiles.let_me_out);
            console.log("tried to play let_me_out.wav");
        }
        if (((nearLocation(this.middleBall.position, this.redButton.position) &&
            nearLocation(this.rightBall.position, this.redButton.position)) ||
            (nearLocation(this.middleBall.position, this.greenButton.position) &&
            nearLocation(this.leftBall.position, this.greenButton.position)) ||
            (nearLocation(this.rightBall.position, this.greenButton.position) &&
            nearLocation(this.leftBall.position, this.greenButton.position))) &&
            !this.waterCheckpoints.bothBallsStuck){
            stopMoving(this.watergirl);
            this.audioManager.playAudio(audioFiles.ball_stuck);
            this.waterCheckpoints.bothBallsStuck = true;
            console.log("tried to play ball_stuck.wav");
        }
        if (((nearLocation(this.fireboy.position, this.coordinates.leftBallStart, 60) && isMovingRight(this.fireboy)) ||
             (nearLocation(this.fireboy.position, this.coordinates.middleBallStart) && isMovingLeft(this.fireboy)) ||
             (nearLocation(this.fireboy.position, this.coordinates.rightBallStart, 40) && isMovingRight(this.fireboy))) &&
             this.waterCheckpoints.dropAfterLeftBall){
            
            this.audioManager.playAudio(audioFiles.dont_fit);
        }
    }
}
