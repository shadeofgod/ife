function Observer(data){
    this.data = data;
    this.walk(data);
    this.eventListen = new Event();
}
Observer.prototype.walk = function(data) {
    for (let key in data) {
        if (data.hasOwnProperty(key)) {
            let val = data[key];
            if (typeof val === 'object') {
                new Observer(val);
            } else {
                this.watch(key, val);
            }
        }
    }
}
Observer.prototype.watch = function(key, val) {
    let that = this;
    Object.defineProperty(that.data, key, {
        enumerable: true,
        configurable: true,
        get: function(){
            console.log(`你访问了${key}属性！`);
            return val;
        },
        set: function(newVal){
            val = newVal;
            that.eventListen.emit(key, val, newVal);
            console.log(`你修改了${key}属性，新的值为${newVal}`);
            if (typeof val === 'object') {
                new Observer(val);
            }
        }
    })
}
Observer.prototype.$watch = function(attr, callback){
    this.eventListen.on(attr, callback);
}
function Event(){
    this.events = {
        // age: [], name: [],...
    };
}
Event.prototype.on = function(attr, callback){
    if(!this.events[attr]) {
        this.events[attr]= [];
    }
    this.events[attr].push(callback);
}
Event.prototype.emit = function(attr, ...args){
    if (this.events[attr]) {
        this.events[attr].forEach((cb) => cb(...args));
    }
}
Event.prototype.off = function(attr) {
    if (attr in this.events && this.events.hasOwnProperty(attr)) {
        delete this.events[attr];
    }
}


let app2 = new Observer({
    name: {
        firstName: 'shaofeng',
        lastName: 'liang'
    },
    age: 25
});
app2.$watch('name', function(val, newVal){
    console.log(`我的名字变了，可能是姓氏也可能是名字变了`)
})
app2.$watch('age', function(val, newVal){
    console.log(`我的年龄变成${newVal}了`)
})
app2.data.name.firstName = '123';
app2.data.age = 99;




/*
app2.$watch('name', function (newName) {
    console.log('我的姓名发生了变化，可能是姓氏变了，也可能是名字变了。')
});

app2.data.name.firstName = 'hahaha';
// 输出：我的姓名发生了变化，可能是姓氏变了，也可能是名字变了。
app2.data.name.lastName = 'blablabla';
// 输出：我的姓名发生了变化，可能是姓氏变了，也可能是名字变了。
*/
