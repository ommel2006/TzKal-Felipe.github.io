import { Sprite } from "./sprite.js";

function nearLocation(currentPos, targetPos, thresholdX = 20, thresholdY = 70){
    return (
        Math.abs(currentPos.x - targetPos.x) <= thresholdX &&
        Math.abs(currentPos.y - targetPos.y) <= thresholdY
    );
}

function moveRight(player){
    player.keys.pressed.right = true;
}

function moveLeft(player){
    player.keys.pressed.left = true;
}

function stopMoving(player){
    player.keys.pressed.left = false;
    player.keys.pressed.right = false;
}

function makeJump(player){
    player.velocity.y = -4.35;
    player.keys.pressed.up = true;
                    
    setTimeout(() => {
        player.keys.pressed.up = false;
    }, 300);
}

function isMovingRight(player){
    return player.keys.pressed.right;
}

function isMovingLeft(player){
    return player.keys.pressed.left;
}

function buildAudioPath(audiofile, voice_type){
    return `res/js/audio/${voice_type}/${audiofile}`
}

function isNearGameObject(player, objects, thresholdX = 100, thresholdY = 70){
    objects.forEach((object) => {
        const withinX = Math.abs(player.position.x - object.position.x) <= thresholdX;
        const withinY = player.position.y - object.position.y <= thresholdY; // but not too far

        if (withinX && withinY) {
            return true; // Found at least one object below within range
        }
    })

    return false
}

function isNearOppositeElementPond(player, collisionBlocks, thresholdX = 140, thresholdY = 100){
    collisionBlocks.forEach((block) => {
        if (block.shape === "pondTriangle" && block.element !== player.element) {
            // Midpoint of the top edge (between northwest and northeast corners)
            const topMid = {
                x: block.hitbox.position.x + block.hitbox.width / 2,
                y: block.hitbox.position.y,
            };

            // Player center
            const playerCenter = {
                x: player.hitbox.position.x + player.hitbox.width / 2,
                y: player.hitbox.position.y + player.hitbox.height / 2,
            };

            // Check horizontal distance (within 140px to either side)
            const withinX = Math.abs(playerCenter.x - topMid.x) <= thresholdX;

            // Check vertical distance (within 100px, but only above the pond)
            const withinY = topMid.y - playerCenter.y <= thresholdY;

            if (withinX && withinY) {
                return true;
            }
        }
    })

    return false;
}

function createCheckpoint(x, y, imgPath) {
  return new Sprite({ position: { x, y }, imgSrc: imgPath, frameRate: 1, imgRows: 1 });
}

export { 
    nearLocation,
    moveRight,
    moveLeft,
    stopMoving,
    makeJump,
    buildAudioPath,
    isNearGameObject,
    isNearOppositeElementPond,
    createCheckpoint,
    isMovingRight,
    isMovingLeft
};
