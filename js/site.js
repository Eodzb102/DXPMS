$(function () {
  view();

  $('.heaer_user_info button').on('click', function () {
    $('.heaer_user_info').toggleClass('active');
  });

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

  $('input[type="checkbox"], label').on('click', function (e) {
    e.stopPropagation();
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

  date_set();

  function date_set() {
    // dtae 가져오기
    let start = $('.time_date').data()['startDate'].replace('20', '').split('-');
    let end = $('.time_date').data()['endDate'].replace('20', '').split('-');
    let start_date = {
      yearMont: `${start[0]}-${start[1]}`,
      day: start[2],
    };
    let end_date = {
      yearMont: `${end[0]}-${end[1]}`,
      day: end[2],
    };

    // console.log(start_date, end_date);

    // 날짜 위치 찾기
    // console.log($('.time_week_title'));
    $('.time_week_title').each(function () {
      // console.log();
      if ($(this).data()['yearMonth'] == start_date.yearMont) {
        // console.log('맞습니다');
      } else {
        // console.log('아닙니다');
      }
    });
  }

  drag();

  function drag() {
    let maxX = $('.work_title').outerWidth();
    let barWidth = $('.width_bar').outerWidth();
    let minX = 80 + barWidth;
    let startX = 0;
    let delX = 0;
    let offsetX = 0;

    $('.width_bar').css({ left: maxX - barWidth / 2 + 'px' });

    $('.width_bar').on('mousedown', function (e) {
      e.preventDefault();
      startX = e.clientX;
      offsetX = $(this).position().left;

      $(document).on('mousemove', function (e) {
        delX = e.clientX - startX;
        if ($('.work_title').outerWidth() >= minX || delX > 0) {
          $('.width_bar').css({ left: offsetX + delX + 'px' });
          $('.work_title').css({ width: offsetX + delX + barWidth / 3 + 'px' });
        }
      });
      $(document).on('mouseup', function () {
        if ($('.width_bar').position().left > maxX) {
          $('.work_title').css({ width: maxX });
          $('.width_bar').css({ left: maxX - 4 + 'px' });
        }
        $(document).off('mousemove mouseup');
      });
    });
  }
});
