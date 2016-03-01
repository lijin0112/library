/**
 * Created by Li on 2016/1/8
 * not finish
 * try avoid using isotope plugin.
 */
$(function () {
  AZ.init();
  var $grid = $('.container').isotope({
    itemSelector: '.block',
    layoutMode: 'masonry',
    masonry: {
      "columnWidth": 165,
      "gutter": 60
    }
  });

});

var AZ = {
  // dom
  $body: $('body'),
  $container: $('.container'),
  $blockArea: $('#block-area'),
  $clickArea: $('#click-area'),
  $sort: $('#sort'),
  $sortBtn: $('#sort').find('a'),
  $list: $('.container>div'),
  currentFilterMode: '.all',
  init: function () {
    selfAdapte();
    $(window).on('resize', function () {
      selfAdapte();
    })
    function selfAdapte() {
      var HEIGHT = 225;
      var WIDTH = 225;
      var curW = $(window).width();
      if (curW < $('#block-area').width()) {
        return;
      }
      col = Math.floor(curW / WIDTH); //一行几个
      row = Math.ceil(AZ.$list.length / col); // 有几行
      for (var i = 0; i < row; i++) {
        for (var j = 0; j < col; j++) {
          if ((i * col + j) == AZ.$list.length) {
            break;
          }
          AZ.$list[i * col + j].style.top = i * HEIGHT + 'px';
          AZ.$list[i * col + j].style.left = j * WIDTH + 'px';
        }
      }
    }

    AZ.bind();
  },
  bind: function () {
    var $doc = $(document);
    $doc.on('click', '.thumbnail', function () {
      var $parent = $(this).parent();

      //FEATURED PANEL EVENT
      AZ.$container
        .find('.block')
        .removeClass('open');
      $parent.addClass('open');
      //$(this).hide();
      AZ.$clickArea.addClass('available');
      AZ.$container.isotope('layout');
      return false;
    });
    //鼠标移动到thumbnail，浮现on-info信息
    $doc.on({
      'mouseenter': function () {
        if ($(this).parent().hasClass('disable')) return false;
        $(this).addClass('blink-list').find('.on-info').show().shuffleLetters();
      },

      'mouseleave': function () {
        $(this).removeClass('blink-list').find('.on-info').hide();
      }
    }, '.thumbnail');

    $doc.on('click', '.close', function () {
      var $parent = $(this).closest('.block');

      $parent.removeClass('open');
      AZ.$clickArea.removeClass('available');
      AZ.$container.isotope('layout');
      return false;
    });

    AZ.$clickArea.on('click', function () {
      AZ.$container.find('.block').removeClass('open');
      //$('.container').find('.block .thumbnail').show()
      $(this).removeClass('available');
      AZ.$container.isotope('layout');

      return false
    })

    //filter
    $('#filter').find('.filtering').on('click', function () {
      var selector = $(this).attr('href');
      AZ.util.filterAction(selector, false);

      AZ.$container.find('.block')
        .removeClass('open')
        .find('.thumbnail').show();

      AZ.currentFilterMode = selector;
      return false;
    });

    //CONTENTS SORT
    AZ.$sortBtn.on('click', function () {
      var sortSelect = $(this).attr('href').replace('#', '');
      AZ.$clickArea.removeClass('available');
      AZ.$blockArea.addClass('active')
      AZ.$container.find('.block')
        .removeClass('open');

      if (sortSelect === 'new') {
        AZ.$container.isotope({
          sortBy: 'date',
          sortAscending: false,
        });

        AZ.$sortBtn.attr('href', '#old').text('New to Old');

      }
      else if (sortSelect === 'old') {
        AZ.$container.isotope({
          sortBy: 'date',
          sortAscending: true
        });

        AZ.$sortBtn.attr('href', '#AtoZ').text('Old to New');
      }
      else if (sortSelect === 'AtoZ') {
        AZ.$container.isotope({
          sortBy: 'title',
          sortAscending: true
        });

        AZ.$sortBtn.attr('href', '#ZtoA').text('A to Z');
      }
      else if (sortSelect === 'ZtoA') {
        AZ.$container.isotope({
          sortBy: 'title',
          sortAscending: false
        });

        AZ.$sortBtn.attr('href', '#default').text('Z to A');
      }
      else if (sortSelect === 'default') {
        AZ.$container.isotope({
          sortBy: 'original-order',
          sortAscending: true
        });

        AZ.$sortBtn.attr('href', '#new').text('Default Sort');
      }


      AZ.$container.isotope('on', 'layoutComplete', function () {
        AZ.$blockArea.removeClass('active');
      });

      return false;
    });
  }
};

AZ.util = {
  filterAction: function (selector, init) {
    if (selector === '.all') {
      AZ.$container.isotope({
        filter: '*',
        sortBy: 'original-order',
        sortAscending: true
      });

      AZ.$sortBtn.attr('href', '#new').text('Default Sort');
      AZ.$sort.fadeIn(300);

    } else if (selector === '.product') {
      AZ.$container.isotope({
        filter: selector,
        sortBy: 'number',
        sortAscending: true
      });

      if (AZ.$sort.css('display') === 'block') {
        AZ.$sort.fadeOut(500);
      }

    }
    if (!init) {
      AZ.$container.find('.block')
        .removeClass('open')
        .find('.thumbnail').show();
      AZ.$clickArea.removeClass('available');

      $('#filter').find('a').removeClass('current');
      $('#filter-' + selector.replace('.', '')).find('a').addClass('current');
    }
    ;
    AZ.$container.isotope('layout');
  }

};