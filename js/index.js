let oPrev = document.getElementById('prev'),
    oNext = document.getElementById('next'),
    oMain = document.getElementsByClassName('main')[0],
    oSwitch = document.getElementsByClassName('switch')[0],
    oLi = document.getElementsByTagName('li'),
    oContainer = document.getElementsByClassName('container')[0],
    oBtn = document.getElementsByClassName('btn')[0];
let timer, timer2,
    index = 0,
    len = oLi.length,
    flag = true;  //在点击运动时进行判断

/**
 * 解析：
 *    每一次轮播总时长400ms
 *    每一次小移动20ms
 *    当前left值小于 targetLeft值，继续移动 else  清空计时器
 * 参数：
 *  dis  需要移动的距离
 */
function moveImg(dis) {
    flag = false;
    let time = 400,
        eachTime = 20,
        eachDis = dis * (eachTime / time),
        targetLeft = oMain.offsetLeft + dis;
    function eachMove() {
        if (dis > 0 && oMain.offsetLeft < targetLeft || dis < 0 && oMain.offsetLeft > targetLeft) {
            oMain.style.left = oMain.offsetLeft + eachDis + 'px';
        } else {
            clearInterval(timer);
            oMain.style.left = targetLeft + 'px';
            // 移动到目标点时进行判断是否无缝连接
            if (targetLeft == -3120) {
                oMain.style.left = -520 + 'px';
            }
            if (targetLeft == 0) {
                oMain.style.left = -2600 + 'px';
            }
            flag = true;
        }
    }
    timer = setInterval(eachMove, eachTime);

}

// 向前翻页
oPrev.onclick = function () {
    if (flag == false) return;
    moveImg(520);
    if (index == 0) {
        index = 4;
    } else {
        index--;
    }
    oliStyle();
}

//向后翻页
oNext.onclick = function () {
    if (flag == false) return;
    moveImg(-520);
    if (index == 4) {
        index = 0;
    } else {
        index++;
    }
    oliStyle();
}


// 点击小圆点进行切换,改变样式
function oliStyle() {
    // 清除之前的active
    oSwitch.getElementsByClassName('active')[0].className = '';
    // 设置当前点击项为 active
    oLi[index].className = 'active';
}

for (let i = 0; i < len; i++) {
    oLi[i].onclick = function () {
        let offset = (index - i) * 520;
        moveImg(offset);
        index = i;
        oliStyle();

    }
}

// 自动切换,执行一次向下翻页点击事件
timer2 = setInterval(oNext.onclick, 2000);

// 鼠标移动到当前页，清除计时器
oContainer.onmouseover = function () {
    clearInterval(timer2);
}

oContainer.onmouseout = function () {
    timer2 = setInterval(oNext.onclick, 2000);
}