var yyy = document.getElementById('xxx');
var context = yyy.getContext('2d');

autoSetCanvas(yyy)

/******************/
listenToUser(yyy)

/******************/

var eraserEnabled = false

pen.onclick = function(){
    eraserEnabled = false
    pen.classList.add('active')
    eraser.classList.remove('active') //消掉橡皮擦的类
}

eraser.onclick = function(){
    eraserEnabled = true 
    eraser.classList.add('active')
    pen.classList.remove('active')//消掉铅笔的类
}

black.onclick = function(){
    context.fillStyle = 'black'
    context.strokeStyle = 'black'
    black.classList.add('active')
    green.classList.remove('active')
    blue.classList.remove('active')
    red.classList.remove('active')

}

red.onclick = function(){
    context.fillStyle = 'red'
    context.strokeStyle = 'red'
    red.classList.add('active')
    green.classList.remove('active')
    blue.classList.remove('active')
    black.classList.remove('active')
}

green.onclick = function(){
    context.fillStyle = 'green'
    context.strokeStyle = 'green'
    green.classList.add('active')
    red.classList.remove('active')
    blue.classList.remove('active')
    black.classList.remove('active')
    
}

blue.onclick = function(){
    context.fillStyle = 'blue'
    context.strokeStyle = 'blue'
    blue.classList.add('active')
    red.classList.remove('active')
    green.classList.remove('active')
    black.classList.remove('active')
}

function autoSetCanvas(canvas) {
    setCanvasSize()

    window.onresize = function () {
        setCanvasSize()
    }

    function setCanvasSize() {
        var pageWidth = document.documentElement.clientWidth
        var pageHeight = document.documentElement.clientHeight

        canvas.width = pageWidth
        canvas.height = pageHeight
    }
} //end autoSetCanvas

function drawLine(x1, y1, x2, y2) {
    context.beginPath()
    context.moveTo(x1, y1) //起点
    context.lineTo(x2, y2) //终点
    context.lineWidth = 5
    context.stroke()
    context.closePath()
}

function drawCircle(x, y, radius) {
    context.beginPath()
    context.arc(x, y, radius, 0, Math.PI * 2);
    context.fill()
}

function listenToUser(canvas) {


    var using = false;
    var lastPoint = {
        x: undefined,
        y: undefined
    }
    //特性检测
    if (document.body.ontouchstart !== undefined) {
        //触屏设备
        canvas.ontouchstart = function (aaa) {
            // console.log('开始摸我了')
            // console.log(aaa)
            var x = aaa.touches[0].clientX;
            var y = aaa.touches[0].clientY;
            // console.log(x,y)
            using = true
            if (eraserEnabled) {
                context.clearRect(x - 5, y - 5, 10, 10)
            } else {
                lastPoint = {
                    x: x,
                    y: y
                }

            }
        }

        canvas.ontouchmove = function (aaa) {
            // console.log('边摸边动')
            var x = aaa.touches[0].clientX;
            var y = aaa.touches[0].clientY;
            // console.log(x,y)

            if (!using) { return }

            if (eraserEnabled) {
                context.clearRect(x - 5, y - 5, 10, 10)
            } else {
                var newPoint = {
                    x: x,
                    y: y
                }
                drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y)
                lastPoint = newPoint
            }
        }

        canvas.ontouchend = function (aaa) {
            // console.log('手拿开了')
            using = false;
        }
    } else {//非触屏
        canvas.onmousedown = function (aaa) {
            var x = aaa.clientX;
            var y = aaa.clientY;
            using = true
            if (eraserEnabled) {
                context.clearRect(x - 5, y - 5, 10, 10)
            } else {
                lastPoint = {
                    x: x,
                    y: y
                }

            }

        }

        canvas.onmousemove = function (aaa) {

            var x = aaa.clientX;
            var y = aaa.clientY;

            if (!using) { return }

            if (eraserEnabled) {
                context.clearRect(x - 5, y - 5, 10, 10)
            } else {
                var newPoint = {
                    x: x,
                    y: y
                }
                drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y)
                lastPoint = newPoint
            }
        }

        canvas.onmouseup = function (aaa) {
            using = false;
        }
    }



}

