/*进入页面之前让js获取屏幕宽高*/
document.addEventListener('touchmove', function(event) {
    event.preventDefault();
}, false);
window.onload = function() {
    $('.wrap').height($(window).height());
    $('.pages').height($('.wrap').height());

    $(window).resize(function() {
        $('.wrap').height($(window).height());
        $('.pages').height($('.wrap').height());
    });
};
