$(function() {
    // 1. 全选 全不选功能模块
    // 就是把全选按钮（checkall）的状态赋值给 三个小的按钮（j-checkbox）就可以了
    // 事件可以使用change
    $('.checkall').change(function() {
        console.log($(this).prop('checked')); //返回 true 或 false
        $('.j-checkbox, .checkall').prop('checked', $(this).prop('checked'));
        // 添加背景
        if ($(this).prop('checked')) {
            $('.cart-item').addClass('check-cart-item');
        } else {
            $('.cart-item').removeClass('check-cart-item');
        }
    });
    // 2. 如果小复选框被选中的个数等于3 就应该把全选按钮选上，否则全选按钮不选
    $('.j-checkbox').change(function() {
        // if(被选中的小的复选框的个数 === 3) {
        //     就要选中全选按钮
        // } else {
        //     不要选中全选按钮
        // }
        // console.log($(".j-checkbox:checked").length);
        // $(".j-checkbox").length 这个是所有的小复选框的个数
        if ($('.j-checkbox:checked').length === $('.j-checkbox').length) {
            $('.checkall').prop('checked', true);
        } else {
            $('.checkall').prop('checked', false);
        }

        // 添加背景
        if ($(this).prop('checked')) {
            $(this).parents('.cart-item').addClass('check-cart-item');
        } else {
            $(this).parents('.cart-item').removeClass('check-cart-item');
        }
    })

    // 3.增减商品数量 首先声明一个变量 当我们点击+号（increment），就让这个值++ ，然后赋值给文本框
    $('.increment').click(function() {
        // 得到当前兄弟文本框的值
        var n = $(this).siblings('.itxt').val();
        n++;
        $(this).siblings('.itxt').val(n);

        // 计算小计模块 根据文本框的值乘以当前商品的价格 就是 商品的小计
        // 当前商品的价格
        var p = $(this).parent().parent().siblings('.p-price').html();
        p = p.substr(1);
        // 小计模块  parents()  toFixed()
        $(this).parent().parent().siblings('.p-sum').html('￥' + (p * n).toFixed(2));
        getSum();
    });

    $('.decrement').click(function() {
        // 得到当前兄弟文本框的值
        var n = $(this).siblings('.itxt').val();
        if (n == 1) {
            return false;
        }
        n--;
        $(this).siblings('.itxt ').val(n);

        // 计算小计模块 根据文本框的值乘以当前商品的价格 就是 商品的小计
        // 当前商品的价格
        var p = $(this).parent().parent().siblings('.p-price').html();
        p = p.substr(1);
        // 小计模块
        $(this).parent().parent().siblings('.p-sum').html('￥' + (p * n).toFixed(2));
        getSum();
    })

    //  4. 用户修改文本框的值 计算 小计模块  
    $(".itxt").change(function() {
        // 先得到文本框的里面的值 乘以 当前商品的单价 
        var n = $(this).val();
        // 当前商品的单价
        var p = $(this).parents(".p-num").siblings(".p-price").html();
        // console.log(p);
        p = p.substr(1);
        $(this).parents(".p-num").siblings(".p-sum").html("￥" + (p * n).toFixed(2));
        getSum();
    });

    // 5.计算总计和总额模块
    getSum();

    function getSum() {
        var count = 0; //计算总件数
        var money = 0; //计算总价钱
        $('.itxt').each(function(i, ele) {
            count += parseInt($(ele).val());
        });
        $('.amount-sum em').text(count);
        $('.p-sum').each(function(i, ele) {
            money += parseFloat($(ele).text().substr(1));
        });
        $('.price-sum em').text('￥' + money.toFixed(2));
    }

    // 6.删除模块
    $('.p-action a').click(function() {
        // 商品后面的删除按钮
        $(this).parents('.cart-item').remove();
        getSum();
    });
    $('.remove-batch').click(function() {
        // 删除选中的商品
        $('.j-checkbox:checked').parents('.cart-item').remove();
        getSum();
    })
    $('.clear-all').click(function() {
        // 清空购物车
        $('.cart-item').remove();
        getSum();
    })

})