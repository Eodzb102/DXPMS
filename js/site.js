$(function () {
  view();

  $('.option_view li').on('click', function () {
    $('.option_view li').removeClass('active');
    $(this).addClass('active');
    view();
  });

  $('.open, .new_request').on('click', function () {
    $('.modal').addClass('on');
  });

  $('.request_cancel').on('click', function (e) {
    $('.modal').removeClass('on');
  });

  $('.option_filter_item').on('click', function (e) {
    e.stopPropagation();
    $(this).siblings().removeClass('active');
    $(this).toggleClass('active');
  });

  $('.table_head button').on('click', function () {
    $(this).siblings().removeClass('active');
    $(this).addClass('active');
  });

  function view() {
    var viewtype = $('.option_view li.active').data('viewtype');
    $('.view_area > div').removeClass('on');
    $('.' + viewtype).addClass('on');
  }

  $(document).click(function (e) {
    if (e.target.className == 'option_filter_item active') {
      return false;
    }
    $('.option_filter_item').removeClass('active');
  });
});
