
class VoiceCommand {
    constructor(params) {
        this.listenCommand = params.listenCommand || "";
        this.commands = params.commands || {};
        var Speech = webkitSpeechRecognition;
        this.speechRecognition = new Speech();
        this.speechRecognition.onresult = this.Listen.bind(this);
        this.speechRecognition.continuous = true;
        this.speechRecognition.start();
        this.speechRecognition.onend = this.speechRecognition.start;
    }

    TestCommand(commands) {
        return !this.listenCommand || this.listenCommand == commands.shift();
    }

    Listen(ev) {
        var strCommand = ev.results[ev.resultIndex][0].transcript.trim();
        var commands = strCommand.split(" ");
        if (this.TestCommand(commands)) {
            var commObj = this.ParseCommand(commands, this.commands);
            if (commObj) {
                commObj.handler(commands);
            }
        }
    }



    ParseCommand(commands, handlers) {
        var commString = commands.shift();
        for(var k in handlers) {
            if (k == commString) {
                var commObj = handlers[k];
                if (!commObj.hasOwnProperty("handler")) return this.ParseCommand(commands, commObj);
                return commObj;
            }
        } 
    }
}