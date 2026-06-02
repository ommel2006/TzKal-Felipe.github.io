export class Deltatime {
    constructor(){
        this.eventTarget = new EventTarget();
        this.interval = null;
        this.intervalRate = 0.01;
    }

    onChange(callback){
        this.eventTarget.addEventListener("valueChanged", callback);
    }

    start(){
        this.interval = setInterval(() => {
            this.eventTarget.dispatchEvent(new Event("valueChanged"));
        }, this.intervalRate);
    }

    stop(){
        clearInterval(this.interval);
    }
}
