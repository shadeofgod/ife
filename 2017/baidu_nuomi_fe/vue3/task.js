function Observer(data, parent, parentKey){
    this.data = data;
    this.parent = parent;
    this.parentKey = parentKey;
    this._watch = {};
    this.walk(data);
}
Observer.prototype.walk = function(data) {
    for (let key in data) {
        if (data.hasOwnProperty(key)) {
            let val = data[key];
            if (typeof val === 'object') {
                new Observer(val, this, key);
            } else {
                this.convert(key, val);
            }
        }
    }
}
Observer.prototype.convert = function(key, val) {
    this.$watch(key, function(newVal) { // 为每个值设置一个监听事件
        console.log(`你设置了 ${key}, 新的值为${newVal}`);
    })
    var that = this;
    Object.defineProperty(that.data, key, {
        enumerable: true,
        configurable: true,
        get: function(){
            console.log(`你访问了${key}属性！`);
            return val;
        },
        set: function(newVal){
            if(that.parent != null) {
                that.parent._watch[that.parentKey](newVal)
            }
            that._watch[key](val, newVal);
            // console.log(`你修改了${key}属性，新的值为${newVal}`);
            if (typeof newVal === 'object') {
                new Observer(newVal);
            }
            if (newVal === val) return;
            val = newVal;
        }
    })
}
Observer.prototype.$watch = function(key, callback){
    this._watch[key] = callback;
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
