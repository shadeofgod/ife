(function(global, factory){
    global.Vue = factory(global);
})(this, function(window){
    var Vue = function(object) {
        this.el = object.el;
        this.data = object.data;
        this.render(this.data);
    }
    Vue.prototype.render = function(data){
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
    return Vue;
});
