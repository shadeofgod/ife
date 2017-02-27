function Observer(data) {
    this.data = data;
    this.walk(data);
}

Observer.prototype.walk = function(object) {
    for (let key in object) {
        if (object.hasOwnProperty(key)) {
            let val = object[key];
            if (typeof val === 'object') {
                new Observer(val);
            } else {
                this.watch(key, val);
            }
        }
    }
}

Observer.prototype.watch = function(key, val) {
    Object.defineProperty(this.data, key, {
        enumerable: true,
        configurable: true,
        get: function() {
            console.log('你访问了' + key);
            return val;
        },
        set: function(newVal) {
            console.log('你设置了' + key, '新的' + key + '值为：' + newVal);
            if (newVal === val) return;
            val = newVal;
        }
    })
}

let app1 = new Observer({
    name: 'youngwind',
    age: 25
});

let app2 = new Observer({
    university: 'bupt',
    major: 'computer'
});
