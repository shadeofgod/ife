function Observer(data) {
    this.data = data;
    this.makeObserver(data);
    this.eventsBus = new Event();
}

Observer.prototype.makeObserver = function(object) {
    for (let key in object) {
        if (object.hasOwnProperty(key)) {
            let val = object[key];
            if (typeof val === 'object') {
                new Observer(val);
            }
            this.watch(key, val)
        }
    }
}

Observer.prototype.watch = function(key, val) {
    let self = this;
    Object.defineProperty(this.data, key, {
        enumerable: true,
        configurable: true,
        get: function() {
            console.log(`你访问了${key}属性！`);
            return val;
        },
        set: function(newVal) {
            self.eventsBus.emit(key, val, newVal)
            console.log(`你修改了${key}属性，新的值为${newVal}`);
            val = newVal;
            if (typeof newVal === 'object') {
                new Observer(val);
            }
        }
    })
}

Observer.prototype.$watch = function(attr, callback) {
    this.eventsBus.on(attr, callback);
}

function Event() {
    this.events = {};
    /* 
    this.events = {
        'age': [callback]
    }
    */
}

// 订阅事件
Event.prototype.on = function(attr, callback) {
    if (this.events[attr]) {
        this.events[attr].push(callback);
    } else {
        this.events[attr] = [callback];
    }
}

// 解除事件
Event.prototype.off = function(attr) {
    for (let key in this.events) {
        if (this.events.hasOwnProperty(key) && key === attr) {
            delete this.events[key];
        }
    }
}

// 触发事件
Event.prototype.emit = function(attr, ...arg) {
    this.events[attr] && this.events[attr].forEach(function(item) {
        item(...arg);
    })
}

let app1 = new Observer({
    name: 'youngwind',
    age: 25,
    company: 'Qihoo 360',
    address: 'Chaoyang, Beijing'
});

let app2 = new Observer({
    basicInfo: {
        name: 'liujianhuan',
        age: 25
    },
    company: 'Qihoo 360',
    address: 'Chaoyang, Beijing'
});

app1.$watch('age', function(val, newVal) {
    console.log(`我的年纪变了，现在已经是：${newVal}岁了`)
});
