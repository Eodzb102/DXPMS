$(function () {
  $('.open').on('click', function () {
    $('.modal').addClass('on');
  });

  $('.cancel').on('click', function () {
    $(this).parents('.on').removeClass('on');
  });

  $('.option_filter_item').on('click', function () {
    $(this).siblings().removeClass('active');
    $(this).toggleClass('active');
  });

  $('.table_head button').on('click', function () {
    $(this).siblings().removeClass('active');
    $(this).addClass('active');
  });
});
