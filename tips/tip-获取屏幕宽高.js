/*����ҳ��֮ǰ��js��ȡ��Ļ���*/
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
