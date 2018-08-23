// 顶部底部隐藏事件   weipan-demo
var winHeight = $(document).scrollTop();
$(window).scroll(function () {
  var scrollY = $(document).scrollTop(); // 获取垂直滚动的距离，即滚动了多少
  if (scrollY > 100) { //如果滚动距离大于550px则隐藏，否则删除隐藏类
    $('.am-header-fixed').addClass('hiddened');
  } else {
    $('.am-header-fixed').removeClass('hiddened');
  }
  if (scrollY > winHeight) { //如果没滚动到顶部，删除显示类，否则添加显示类
    $('.am-header-fixed').removeClass('showed');
  } else {
    $('.am-header-fixed').addClass('showed');
  }

  if (scrollY > 100) { //如果滚动距离大于550px则隐藏，否则删除隐藏类
    $('.am-navbar').removeClass('hiddenedB');
  } else {
    $('.am-navbar').addClass('hiddenedB');
  }
  if (scrollY > winHeight) { //如果没滚动到顶部，删除显示类，否则添加显示类
    $('.am-navbar').removeClass('showedB');
  } else {
    $('.am-navbar').addClass('showedB');
  }
});

$().position()

$().offset()

var Top = $(window).scrollTop();
if (Top > $(".ricecooker-wrap .steam").offset().top - 400) {
  /* xxx */
}

