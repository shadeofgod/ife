(function(global, factory){
    global.Vue = factory(global);
})(this, function(window){
    function Vue(options) {
        this._watch = {};
        // this.walk(options);
        for (var key in options) {
            this[key] = options[key];
        }
        this.render();
    }

    var vp = Vue.prototype;

    vp.render = function(){
        var tagRE = /\{\{(.*?)\}\}/g;
        var app = document.querySelector(this.el);
        if (tagRE.test(app.innerHTML)) {
            var that = this;
            var matches = app.innerHTML.match(tagRE);
            matches.forEach(function(item){
                app.innerHTML = app.innerHTML.replace(item, eval('that.data.' + item.replace(/[\{\{\}\}]/g, '')));
            })
        }
    }

    vp.walk = function(obj){
        for (var key in object) {
            if (object.hasOwnProperty(key)) {
                var val = object[key];

            }
        }
    }

    return Vue;
});
