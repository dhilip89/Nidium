Tests.registerAsync("Echo websocket.org (plain)", function(next) {
    var done = false;
    var client = new WebSocket("ws://localhost:9000/");

    client.onopen = function() {
        client.send("echo me");
    }

    client.onmessage = function(ev) {
        Assert.equal(ev.data, "echo me");
        client.close();
        done = true;
    }

    client.onclose = function() {
        Assert.equal(done, true, "Connection has been closed before the end of test");
        next();
    }
}, 3000);


Tests.registerAsync("Echo websocket.org (Secure)", function(next) {
    var done = false;
    var client = new WebSocket("wss://localhost:9443/");

    client.onopen = function() {
        client.send("echo me");
    }

    client.onmessage = function(ev) {
        Assert.equal(ev.data, "echo me");
        client.close();
        done = true;
    }

    client.onclose = function() {
        Assert.equal(done, true, "Connection has been closed before the end of test");
        next();
    }
}, 3000);

Tests.registerAsync("Echo websocket.org (plain / binary)", function(next) {
    var done = false;
    var client = new WebSocket("ws://localhost:9000/");

    client.onopen = function() {
        client.send(new Uint8Array([42, 90]).buffer);
    }

    client.onmessage = function(ev) {
        Assert.equal(ev.data instanceof ArrayBuffer, true, "Data should be an ArrayBuffer");
        Assert.equal(ev.data.byteLength, 2, "ArrayBuffer length should be 2");

        var v = new Uint8Array(ev.data);

        Assert.equal(v[0], 42);
        Assert.equal(v[1], 90);

        client.close();
        done = true;
    }

    client.onclose = function() {
        Assert.equal(done, true, "Connection has been closed before the end of test");
        next();
    }
}, 3000);