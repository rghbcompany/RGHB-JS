const AlertServices = {
    base: function (type, message) {
        new Noty({
            text: message,
            type: type,
            theme: 'limitless',
            layout: 'topRight',
            timeout: 2500
        }).show();
    },
    error: function (message) {
        this.base("error", message); // Use `this.base` to call the base method
    },
    success: function (message) {
        this.base("success", message); // Use `this.base` to call the base method
    },
    warning: function (message) {
        this.base("warning", message); // Use `this.base` to call the base method
    },
    info: function (message) {
        this.base("info", message); // Use `this.base` to call the base method
    },
};