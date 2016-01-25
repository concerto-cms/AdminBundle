webpackJsonp([1],{

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {var container = $("#login-container"),
	    LoginView = __webpack_require__(12);

	global.view = new LoginView({
	    el: container
	});
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },

/***/ 12:
/***/ function(module, exports, __webpack_require__) {

	var Marionette = __webpack_require__(8);

	module.exports = Marionette.View.extend({
	    initialize: function() {
	        this.ui.username.focus();
	    },

	    ui: {
	        "username": "[name=username]",
	        "password": "[name=password]"
	    },

	    events: {
	        "submit": "onSubmit" //is the same as "click .dog":
	    },
	    onSubmit: function(e) {
	        var $username = this.ui.username,
	            $password = this.ui.password;

	        if (!$username.val()) {
	            e.preventDefault();
	            $username.focus();
	            return false;
	        }
	        if (!$password.val()) {
	            e.preventDefault();
	            $password.focus();
	            return false;
	        }
	        return true;

	    }

	});


/***/ }

});