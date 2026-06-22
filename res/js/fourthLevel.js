import { 
    nearLocation,
    moveRight,
    moveLeft,
    stopMoving,
    makeJump
} from "./helperFunctions.js";

let audioFiles = {
    few_paths: "few_paths.wav",
    levers_at_end: "levers_at_end.wav",
    middle_blocked: "middle_blocked.wav",
    try_lava_path: "try_lava_path.wav",
    dont_go_middle: "dont_go_middle.wav",
    careful_waterpool: "careful_waterpool.wav",
    same_red_lever: "same_red_lever.wav",
    wish_fire: "wish_fire.wav",
    red_lever_pushed: "red_lever_pushed.wav",
    middle_unlocked: "middle_unlocked.wav",
    jump_home: "jump_home.wav",
    slip_slope: "slip_slope.wav",
    careful_acid: "careful_acid.wav",
    push_button: "push_button.wav",
    lift_platform: "lift_platform.wav",
    world_record: "world_record.wav",
    wait_for_me: "wait_for_me.wav"
};

export class FourthLevelManager {
    constructor(fireboy, watergirl, audioManager, allButtons, allLevers){
        this.fireboy = fireboy;
        this.watergirl = watergirl;
        this.audioManager = audioManager;
        this.audioManager.nextAudioForTimer([audioFiles.few_paths, audioFiles.levers_at_end, audioFiles.middle_blocked, audioFiles.try_lava_path]);
        this.whiteButtonLeft = allButtons[0][0];
        this.whiteButtonRight = allButtons[0][1];
        this.blueLever = allLevers[0];
        this.redLever = allLevers[1];
        
        this.fireCheckpoints = {
            fireDoor: false,
            carefulWater: false,
            downMiddlePath: false,
            nearEnd: false
        };
        
        this.waterCheckpoints = {
            firstWaterDrop: false,
            thirdWaterDrop: false,
            fifthWaterDrop: false,
            redLever: false,
            platformAfterLever: false,
            gapRightOfBluePlatform: false,
            firstWaterPool: false,
            beforeBluePlatformDrop: false,
            beforeRedPlatformDrop: false,
            beforeFinalDrop: false,
            rightButton: false,
            waterDoor: false,
            pushButton: false
        };
        
        this.coordinates = {
            waterStart: {x: 1100, y: 47},
            firstWaterDrop: {x: 1280, y: 96},
            afterFirstWaterDrop: {x: 1280, y: 227},
            secondWaterDrop: {x: 1192, y: 243},
            afterSecondWaterDrop: {x: 1210, y: 352},
            thirdWaterDrop: {x: 832, y: 485},
            afterThirdWaterDrop: {x: 833, y: 692},
            beforeFirstLavaPool: {x: 883, y: 622},
            fourthWaterDrop: {x: 1160, y: 563},
            afterFourthWaterDrop: {x: 1200, y: 658},
            fifthWaterDrop: {x: 1270, y: 692},
            afterFifthWaterDrop: {x: 1265, y: 800},
            atRedLever: {x: 1065, y: 766},
            aboveRedLever: {x: 1065, y: 650},
            gapRightOfBluePlatform: {x: 780, y: 527},
            beforeHugeDropJump: {x: 1000, y: 227},
            downMiddlePath: {x: 776, y: 402},
            beforeBluePlatformDrop: {x: 652, y: 520},
            afterBluePlatformDrop: {x: 652, y: 622},
            beforeRedPlatformDrop: {x: 725, y: 665},
            afterRedPlatformDrop: {x: 725, y: 802},
            betweenFireAndWaterPools: {x: 374, y: 730},
            beforeFinalDrop: {x: 51, y: 745},
            afterFinalDrop: {x: 51, y: 896},
            beforeFirstAcidPool: {x: 281, y: 874},
            beforeSecondAcidPool: {x: 461, y: 874},
            beforeWhiteBarrier: {x: 873, y: 910},
            secondWhiteButton: {x: 1273, y: 910},
            fireDoor: {x: 1043, y: 910},
            waterDoor: {x: 1143, y: 910},
        };
    }

    markFireboyCheckpoints(){
        if (nearLocation(this.fireboy.position, this.coordinates.fireDoor) && !this.fireCheckpoints.fireDoor){
            //this.audioManager.playAudioPA(audioFiles.world_record, "greater_acknowledgement");
            if (paEnabled){
                this.audioManager.playAudio(audioFiles.world_record, true, "greater_acknowledgement");
            } else {
                this.audioManager.playAudio(audioFiles.world_record);
            }
            this.fireCheckpoints.fireDoor = true;
        }
    }

    markWatergirlCheckpointsAndStops(){
        if (nearLocation(this.watergirl.position, this.coordinates.firstWaterDrop) && !this.waterCheckpoints.firstWaterDrop){
            stopMoving(this.watergirl);
            this.waterCheckpoints.firstWaterDrop = true;
        }
        if (nearLocation(this.watergirl.position, this.coordinates.thirdWaterDrop) && !this.waterCheckpoints.thirdWaterDrop){
            stopMoving(this.watergirl);
            this.waterCheckpoints.thirdWaterDrop = true;
        }
        if (nearLocation(this.watergirl.position, this.coordinates.fifthWaterDrop) && !this.waterCheckpoints.fifthWaterDrop){
            stopMoving(this.watergirl);
            this.waterCheckpoints.fifthWaterDrop = true;
        }
        if (nearLocation(this.redLever.ramp.position, this.redLever.ramp.finalPosition) && 
            nearLocation(this.watergirl.position, this.coordinates.atRedLever) && !this.waterCheckpoints.redLever){
            stopMoving(this.watergirl);
            this.waterCheckpoints.redLever = true;
        }
        if (nearLocation(this.watergirl.position, this.coordinates.afterFourthWaterDrop) && !this.waterCheckpoints.platformAfterLever &&
           this.redLever.pressed){
            stopMoving(this.watergirl);
            this.waterCheckpoints.platformAfterLever = true;
        }
        if (nearLocation(this.watergirl.position, this.coordinates.gapRightOfBluePlatform) && !this.waterCheckpoints.gapRightOfBluePlatform &&
           this.redLever.pressed){
            stopMoving(this.watergirl);
            this.waterCheckpoints.gapRightOfBluePlatform = true;
        }
        if (nearLocation(this.watergirl.position, this.coordinates.afterSecondWaterDrop) && !this.waterCheckpoints.firstWaterPool &&
           this.redLever.pressed){
            stopMoving(this.watergirl);
            this.waterCheckpoints.firstWaterPool = true;
        }
        if (nearLocation(this.watergirl.position, this.coordinates.beforeBluePlatformDrop) && !this.waterCheckpoints.beforeBluePlatformDrop){
            stopMoving(this.watergirl);
            this.waterCheckpoints.beforeBluePlatformDrop = true;
        }
        if (nearLocation(this.watergirl.position, this.coordinates.beforeRedPlatformDrop) && !this.waterCheckpoints.beforeRedPlatformDrop){
            stopMoving(this.watergirl);
            this.waterCheckpoints.beforeRedPlatformDrop = true;
        }
        if (nearLocation(this.watergirl.position, this.coordinates.beforeFinalDrop) && !this.waterCheckpoints.beforeFinalDrop){
            stopMoving(this.watergirl);
            this.waterCheckpoints.beforeFinalDrop = true;
        }
        if (nearLocation(this.watergirl.position, this.coordinates.secondWhiteButton) && !this.waterCheckpoints.rightButton){
            stopMoving(this.watergirl);
            this.audioManager.playAudio(audioFiles.lift_platform);
            this.waterCheckpoints.rightButton = true;
        }
        if (nearLocation(this.watergirl.position, this.coordinates.waterDoor) && !this.waterCheckpoints.waterDoor && this.fireCheckpoints.fireDoor){
            stopMoving(this.watergirl);
            this.waterCheckpoints.waterDoor = true;
        }
    }
    
    controlWatergirlMovement(){
        if (nearLocation(this.watergirl.position, this.coordinates.waterStart) && this.blueLever.pressed){
            moveRight(this.watergirl);
            //just half or the audio should be PA ("nice job"), rest should be normal
            //this.audioManager.playAudioPA(audioFiles.same_red_lever, "small_acknowledgement");
            if (paEnabled){
                this.audioManager.playAudio(audioFiles.same_red_lever, true, "small_acknowledgement");
            } else {
                this.audioManager.playAudio(audioFiles.same_red_lever);
            }
        }
        if (nearLocation(this.watergirl.position, this.coordinates.afterFirstWaterDrop)){
            moveLeft(this.watergirl);
        }
        if (nearLocation(this.watergirl.position, this.coordinates.afterThirdWaterDrop) && !this.redLever.pressed){
            moveRight(this.watergirl);
        }
        if (nearLocation(this.watergirl.position, this.coordinates.beforeFirstLavaPool) && !this.redLever.pressed){
            makeJump(this.watergirl);
            this.audioManager.playAudio(audioFiles.wish_fire);
        }
        if (nearLocation(this.watergirl.position, this.coordinates.afterFifthWaterDrop)){
            moveLeft(this.watergirl);
        }
        if (nearLocation(this.watergirl.position, this.coordinates.atRedLever) && 
           nearLocation(this.redLever.ramp.position, this.redLever.ramp.finalPosition)){
            makeJump(this.watergirl);
            this.audioManager.playAudio(audioFiles.red_lever_pushed);
        }
        if (nearLocation(this.watergirl.position, this.coordinates.aboveRedLever) && this.redLever.pressed){
            moveRight(this.watergirl);
        }
        if (nearLocation(this.watergirl.position, this.coordinates.afterFourthWaterDrop) && this.redLever.pressed){
            makeJump(this.watergirl);
            moveLeft(this.watergirl);
        }
        if (nearLocation(this.watergirl.position, this.coordinates.afterThirdWaterDrop) && this.redLever.pressed){
            makeJump(this.watergirl);
        }
        if (nearLocation(this.watergirl.position, this.coordinates.gapRightOfBluePlatform) && this.redLever.pressed && this.watergirl.isOnBlock){
            makeJump(this.watergirl);
            moveRight(this.watergirl);
            this.audioManager.playAudio(audioFiles.middle_unlocked);
        }
        if (nearLocation(this.watergirl.position, this.coordinates.afterSecondWaterDrop) && this.redLever.pressed){
            makeJump(this.watergirl);
            moveLeft(this.watergirl);
        }
        if (nearLocation(this.watergirl.position, this.coordinates.beforeHugeDropJump) && this.watergirl.isOnBlock){
            makeJump(this.watergirl);
            this.audioManager.playAudio(audioFiles.jump_home);
        }
        if (nearLocation(this.watergirl.position, this.coordinates.afterBluePlatformDrop)){
            moveRight(this.watergirl);
            this.audioManager.playAudio(audioFiles.slip_slope);
        }
        if (nearLocation(this.watergirl.position, this.coordinates.afterRedPlatformDrop)){
            moveLeft(this.watergirl);
        }
        if (nearLocation(this.watergirl.position, this.coordinates.betweenFireAndWaterPools)){
            makeJump(this.watergirl);
        }
        if (nearLocation(this.watergirl.position, this.coordinates.afterFinalDrop)){
            moveRight(this.watergirl);
            this.audioManager.playAudio(audioFiles.careful_acid);
        }
        if (nearLocation(this.watergirl.position, this.coordinates.beforeFirstAcidPool)){
            makeJump(this.watergirl);
        }
        if (nearLocation(this.watergirl.position, this.coordinates.beforeSecondAcidPool)){
            makeJump(this.watergirl);
        }
        if (nearLocation(this.watergirl.position, this.coordinates.secondWhiteButton) && this.fireCheckpoints.fireDoor){
            moveLeft(this.watergirl);
        }
    }

    checkForLevelStateActions(){
        if (nearLocation(this.fireboy.position, this.coordinates.downMiddlePath) && !this.fireCheckpoints.downMiddlePath &&
           !this.redLever.pressed){
            this.audioManager.playAudio(audioFiles.dont_go_middle);
            this.fireCheckpoints.downMiddlePath = true;
        }
        if (nearLocation(this.fireboy.position, this.coordinates.beforeHugeDropJump) && !this.fireCheckpoints.carefulWater){
            this.audioManager.playAudio(audioFiles.careful_waterpool);
            this.fireCheckpoints.carefulWater = true;
        }
        if (nearLocation(this.watergirl.position, this.coordinates.beforeWhiteBarrier) && !this.waterCheckpoints.pushButton &&
           !nearLocation(this.whiteButtonLeft.ramp.position, this.whiteButtonLeft.ramp.finalPosition)){
            this.audioManager.playAudio(audioFiles.push_button);
            this.waterCheckpoints.pushButton = true;
        }
        if (nearLocation(this.fireboy.position, this.coordinates.beforeSecondAcidPool) && !this.fireCheckpoints.nearEnd &&
           !this.waterCheckpoints.beforeRedPlatformDrop){
            this.audioManager.playAudio(audioFiles.wait_for_me);
            this.fireCheckpoints.nearEnd = true;
        }
    }
}
