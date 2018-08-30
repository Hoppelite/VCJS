
class MediaRequest {
    constructor() {
        this.hasAudio = false;
        this.hasVideo = false;
        this.FindMedia();
    }

    async FindMedia() {   
        var devices = await navigator.mediaDevices.enumerateDevices();
        for(var i in devices) {
            var device = devices[i];
            switch (device.kind) {
                case "audioinput":
                    this.hasAudio = true;
                case "videoinput":
                    this.hasVideo = true;
            }
        } 
    }

    async Request(constraints) {
        navigator.mediaDevices.getUserMedia(constraints);
    }
}