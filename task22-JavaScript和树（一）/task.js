var list = [];
var timer = null;
var root = document.getElementsByClassName('root')[0];

window.onload = function() {
    document.getElementsByTagName('button')[0].onclick = function() {
        reset();
        preOrder(root);
        changeColor();
    }

    document.getElementsByTagName('button')[1].onclick = function() {
        reset();
        inOrder(root);
        changeColor();
    }

    document.getElementsByTagName('button')[2].onclick = function() {
        reset();
        postOrder(root);
        changeColor();
    }

}
// reset all
function reset() {
    list = [];
    clearInterval(timer);
    var divs = document.getElementsByTagName('div');
    for (var i = 0; i < divs.length; i++) {
        divs[i].style.backgroundColor = '#fff';
    }
}
// color changing
function changeColor() {
    var i = 0;
    list[i].style.backgroundColor = 'red';
    timer = setInterval(function (arg) {
        i++;
        if (i < list.length) {
            list[i-1].style.backgroundColor = '#ccc';
            list[i].style.backgroundColor = 'red';
        } else {
            clearInterval(timer);
            list[list.length-1].style.backgroundColor = '#ccc';
        }
    },1000)
}
// 前序: 根-左-右
function preOrder(node) {
    if (node !== null) {
        list.push(node);
        preOrder(node.firstElementChild);
        preOrder(node.lastElementChild);
    }
}
// 中序: 左-根-右
function inOrder(node) {
    if (node !== null) {
        inOrder(node.firstElementChild);
        list.push(node);
        inOrder(node.lastElementChild);
    }
}
// 后序: 左-右-根
function postOrder(node) {
    if (node !== null) {
        postOrder(node.firstElementChild);
        postOrder(node.lastElementChild);
        list.push(node);
    }
}
