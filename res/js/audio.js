import { 
    buildAudioPath, 
    buildAudioPathPA 
} from "./helperFunctions.js";

let voice_type = "original";
let audioEnabled = true;
let paEnabled = false;

function changeVoice(voice){
    voice_type = voice;
}

function setAudioEnabled(bool){
    audioEnabled = bool;
}

function setPAEnabled(bool){
    paEnabled = bool;
}

function* audioIterator(audioFiles) {
    for (const file of audioFiles) {
        yield file;
    }
}

class AudioManager {
    constructor(){
        this.audio = new Audio();
        this.isPlaying = false;
        this.queue = null;
        this.currentSrc = null;
        this.nextAudio = null;
        this.audioInterval = null;
        this.timedAudioDelay = 7;
        this.timer = 0;

        //this.timeToWait = 5;
    }

    resetAudioTimer(){
        this.timer = 0;
    }

    playAudio(audioSrc, forgetNext=true, paType=null){
        if (!audioSrc.startsWith("res/js")){
            if (paType){
                audioSrc = buildAudioPathPA(audioSrc, voice_type, paType);
            } else {
                audioSrc = buildAudioPath(audioSrc, voice_type);
            }
        }

         if (forgetNext){
            this.nextAudio = null;
        }

        if (audioSrc === this.currentSrc || audioSrc === this.queue || !audioEnabled){
            return;
        }
        
        if (this.isPlaying){
            this.queue = audioSrc;
            //this.stopAudio();
            //this.playAudio(audioSrc);
        } else {
            this.audio.src = audioSrc;
            this.audio.load();
            this.audio.play();
            this.isPlaying = true;
            this.currentSrc = audioSrc;

            this.audio.onended = () => {

                //setting a universal delay for every time play audio is called
                //const currTimer = this.timer;
                //this.audioInterval = setInterval(() => {
                    //this.timer++;
                    //if (this.timer - currTimer >= this.timeToWait){
                        //clearInterval(this.audioInterval);
                    //}
                //}, 1000);

                this.isPlaying = false;
                this.currentSrc = null;

                if (this.queue){
                    const nextAudio = this.queue;
                    this.queue = null;
                    this.playAudio(nextAudio);
                }
            };
        }

        this.resetAudioTimer();
    }

    stopAudio(includeYouGotIt=false){
        console.log(this.currentSrc + " audio stopped");
        this.audio.pause();
        this.audio.currentTime = 0;
        this.isPlaying = false;
        this.currentSrc = null;
        if (includeYouGotIt){
            this.playAudio("you_got_it.wav");
        }
    }

    startAudioTimer(){
        this.audioInterval = setInterval(() => {
            this.timer++;
    
            if (this.timer === this.timedAudioDelay && this.nextAudio){
                if (typeof this.nextAudio === "string"){
                    this.playAudio(this.nextAudio);
                }
                else{
                    let nextAudio = this.nextAudio.next();

                    if (nextAudio.done){
                        this.nextAudio = null;
                    }
                    else{
                        this.playAudio(nextAudio.value, false);
                    }
                }
            }
        }, 1000);
    }

    stopAudioTimer(){
        clearInterval(this.audioInterval);
        this.resetAudioTimer();
    }

    nextAudioForTimer(audioSrc){
        this.resetAudioTimer();
        
        if (typeof audioSrc === "string"){
            this.nextAudio = audioSrc;
        }
        else if (Array.isArray(audioSrc) && audioSrc.every(item => typeof item === "string")){
            this.nextAudio = audioIterator(audioSrc);
        }
    }
}

export{ changeVoice, setAudioEnabled, setPAEnabled, AudioManager };
