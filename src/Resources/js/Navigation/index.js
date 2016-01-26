var Application = require("./App");
var app = global.app = new Application();

app.start({
    el: document.getElementById("navigation-container")
});