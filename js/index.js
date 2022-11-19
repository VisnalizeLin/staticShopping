window.addEventListener('load', function() {
    var sright = document.querySelector('.sright');
    var sleft = document.querySelector('.sleft');
    var focus = document.querySelector('.focus');
    var focusWidth = focus.offsetWidth; // 得到当前图片的宽度

    focus.addEventListener('mouseenter', function() {
        sleft.style.display = 'block';
        sright.style.display = 'block';
        // 鼠标经过，停止定时器
        clearInterval(timer);
        timer = null; // 清除定时器变量
    })
    focus.addEventListener('mouseleave', function() {
        sleft.style.display = 'none';
        sright.style.display = 'none';
        // 鼠标离开，自动播放轮播图
        timer = setInterval(function() {
            // 手动调用点击事件
            sright.click();
        }, 3000);
    })

    // 动态生成小圆圈 几张图就有几个小圆圈
    var ul = focus.querySelector('ul');
    var ol = focus.querySelector('ol');
    // console.log(ul.children.length);
    for (var i = 0; i < ul.children.length; i++) {
        // 创建一个 li
        var li = this.document.createElement('li'); //创建节点
        // 顺便记录小圆圈 的索引号，通过自定义属性来做
        li.setAttribute('index', i);
        // 把li 插入 ol里面
        ol.appendChild(li); //插入节点
        // 小圆圈的排他思想，我们可以直接在生成小圆圈的同时直接绑定点击事件
        li.addEventListener('click', function() {
            // 1.干掉所有人 清除current
            for (var i = 0; i < ol.children.length; i++) {
                ol.children[i].className = '';
            }
            // 2.留下我自己
            this.className = 'current';
            // 点击li 移动图片，移动的是ul
            // ul 的移动距离 小圆圈的索引号 乘以 图片的宽度 注意是负值
            var focusWidth = focus.offsetWidth; // 得到当前图片的宽度
            var index = this.getAttribute('index'); //得到当前的索引号
            num = index; //当我们点击了某个li 就把这li的索引号给num
            circle = index; //当我们点击了某个li 就把这li的索引号给circle
            // num = circle =index;
            animate(ul, -index * focusWidth);
        })
    }
    // 把 ol 里面 的第一个li 设置类名为 current
    ol.children[0].className = 'current';

    // 克隆第一张图片（li）放在ul的最后，形成无缝连接
    var first = ul.children[0].cloneNode(true); //深克隆
    ul.appendChild(first);
    // 点击右侧按钮，图片滚动一次
    var num = 0;
    var circle = 0; //变色小圆圈的控制
    // flag 节流阀
    var flag = true;
    sright.addEventListener('click', function() {
        if (flag) {
            flag = false;
            if (num == ul.children.length - 1) {
                ul.style.left = 0;
                num = 0;
            }
            num++;
            animate(ul, -num * focusWidth, function() {
                // 回调函数
                flag = true; //打开节流阀
            });
            // 点击右侧按钮，小圆圈跟着一起变化
            circle++;
            // console.log(circle);
            // 如果circle = 5 说明图片走到克隆的最后一张，我们就复原
            if (circle == ol.children.length) {
                circle = 0;
            }
            // 调用函数
            circleChange();
        }
    })

    // 左侧按钮做法
    sleft.addEventListener('click', function() {
        if (flag) {
            flag = false;
            if (num == 0) {
                num = ul.children.length - 1;
                ul.style.left = -num * focusWidth + 'px';

            }
            num--;
            animate(ul, -num * focusWidth, function() {
                flag = true; // 打开节流阀
            });
            // 点击右侧按钮，小圆圈跟着一起变化
            circle--;
            // console.log(circle);
            // 如果circle < 0 说明图片走到第一张，小圆圈要改为第五个小圆圈（4）
            // if (circle < 0) {
            //     circle = ol.children.length - 1;
            // }
            circle = circle < 0 ? ol.children.length - 1 : circle;
            // 调用函数
            circleChange();
        }
    })

    function circleChange() {
        for (var i = 0; i < ol.children.length; i++) { // 排他思想
            ol.children[i].className = '';
        }
        ol.children[circle].className = 'current';
    }


    // 自动播放轮播图
    var timer = setInterval(function() {
        // 手动调用点击事件
        sright.click();
    }, 3000);
})


$(function() {
    // 当我们点击li 此时不需要执行 页面滚动事件里面的li的背景选择 即添加current
    // 节流阀 互斥锁
    var flag = true;
    // 电梯导航显示和隐藏
    var tooltop = $('.recom').offset().top;
    toggletool();

    function toggletool() {
        if ($(document).scrollTop() >= tooltop) {
            $('.fixedtool').fadeIn();
        } else {
            $('.fixedtool').fadeOut();
        }
    }
    $(window).scroll(function() {
        toggletool();
        //页面滚动到某个内容区域，电梯导航相应的添加和删除current
        if (flag) {
            $('.floor .w').each(function(i, ele) {
                if ($(document).scrollTop() >= $(ele).offset().top) {

                    $('.fixedtool li').eq(i).addClass('current').siblings().removeClass();
                }
            })
        }
    })


    // 点击电梯导航页面可以滚动到相应位置
    $('.fixedtool li').click(function() {
        flag = false;
        var toolindex = $(this).index();
        // 当我们点击li  需要计算出页面要去往的位置
        var current = $('.floor .w').eq(toolindex).offset().top;
        // 页面滚动效果
        $('body, html').stop().animate({
            scrollTop: current
        }, function() {
            // 回调函数
            flag = true;
        });
        $(this).addClass('current').siblings().removeClass('current');
    })

})