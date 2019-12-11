(function(ext) {
    // Cleanup function when the extension is unloaded
    ext._shutdown = function() {};

    // Status reporting code
    // Use this to report missing hardware, plugin or unsupported browser
    ext._getStatus = function() {
        return {status: 2, msg: 'Ready'};
    };

    ext.pollApi = function(cmd) {
        var request = new XMLHttpRequest();
        request.open('GET', 'http://car:5000/get/'+cmd, false);  // `false` makes the request synchronous
        request.send(null);

        if (request.status === 200) {
            return JSON.parse(request.responseText).cmd;
        }
        return false;
    };
    ext.pinApi = function(pin, value) {
        var request = new XMLHttpRequest();
        request.open('GET', 'http://car:5000/gpio/' + pin + '/' + value, false);  // `false` makes the request synchronous
        request.send(null);

        if (request.status === 200) {
            return JSON.parse(request.responseText).result == 'success';
        }
        return false;
    };
    ext.servoApi = function(cmd) {
        var request = new XMLHttpRequest();
        var command_map = {
          "Left"   : 105,
          "Center" : 120,
          "Right"  : 135
        }
        var turn_angle = command_map[cmd]

        request.open('GET', 'http://car:5000/motor/'+turn_angle, false)
        request.send(null);

        if (request.status === 200) {
          return JSON.parse(request.responseText).cmd;
        }
    return false;
    };
    ext.shutdownApi = function() {
        var request = new XMLHttpRequest();
        request.open('GET', 'http://car:5000/shutdown', true);
        request.send(null);
        return true;
    };

    // Block and block menu descriptions
    var descriptor = {
        blocks: [
            ["h","Button %m.buttonLabels is pressed","pollApi","A1"],
            ["h","Hand gesture %m.myoGestures is made","pollApi","wave in"],
            [" ","Pin %n set %m.pinValue", "pinApi", 1, "LOW"],
            [" ","Servo turning %m.servoMotor", "servoApi", "Center"],
            [" ","Shutdown car", "shutdownApi"]
	],
	menus: {
            "myoGestures": ["wave in", "wave out", "tap", "open", "fist"],
            "buttonLabels": ["A1", "A2", "A3", "B1", "B2", "B3", "C1", "C2", "C3"],
            "pinValue" : ["LOW", "HIGH"],
            "servoMotor" : ["Left", "Center", "Right"]
        }
    };

    // Register the extension
    ScratchExtensions.register('Scratch Car', descriptor, ext);
})({});
