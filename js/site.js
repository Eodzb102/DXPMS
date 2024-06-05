$(function () {
  function initializeDatepickers() {
    $('#fliterStartDate, #filterEndDate, #desiredDate, #startWorkDate, #endWorkDate, #finalApproval').datepicker({
      format: 'yyyy-mm-dd',
      autoclose: true,
      language: 'ko',
      changeMonth: true,
      changeYear: true,
    });

    $('#fliterStartDate')
      .on('changeDate', function (selected) {
        var startDate = new Date(selected.date.valueOf());
        $('#filterEndDate').datepicker('setStartDate', startDate);
      })
      .on('clearDate', function () {
        $('#filterEndDate').datepicker('setStartDate', null);
      });

    $('#filterEndDate')
      .on('changeDate', function (selected) {
        var endDate = new Date(selected.date.valueOf());
        $('#fliterStartDate').datepicker('setEndDate', endDate);
      })
      .on('clearDate', function () {
        $('#fliterStartDate').datepicker('setEndDate', null);
      });

    $('#startWorkDate')
      .on('changeDate', function (selected) {
        var startDate = new Date(selected.date.valueOf());
        $('#endWorkDate').datepicker('setStartDate', startDate);
      })
      .on('clearDate', function () {
        $('#endWorkDate').datepicker('setStartDate', null);
      });

    $('#endWorkDate')
      .on('changeDate', function (selected) {
        var endDate = new Date(selected.date.valueOf());
        $('#startWorkDate').datepicker('setEndDate', endDate);
      })
      .on('clearDate', function () {
        $('#startWorkDate').datepicker('setEndDate', null);
      });
  }

  initializeDatepickers();

  updateView();

  $('.heaer_user_info button').on('click', function () {
    $('.heaer_user_info').toggleClass('active');
  });

  $('.option_view li').on('click', function () {
    $('.option_view li').removeClass('active');
    $(this).addClass('active');
    updateView();
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

  $('.option_cancel button').on('click', function () {
    $('.option_filter_item').removeClass('selected');
    $('.filter_item_selected').text('');
  });

  $('.option_filter_item li input').on('click', function () {
    $(this).closest('.option_filter_item').addClass('selected');
    $(this).closest('.option_filter_item').find('.filter_item_selected').text(`: ${text}`);
  });

  function updateView() {
    var viewType = $('.option_view li.active').data('viewtype');
    $('.view_area > div').removeClass('on');
    $('.' + viewType).addClass('on');
  }

  $(document).click(function (e) {
    if (e.target.className == 'option_filter_item active') {
      return false;
    }
    $('.option_filter_item').removeClass('active');
  });

  date_set();

  function date_set() {
    $('.progress_date').each(function () {
      // progress_date의 start-date와 end-date 가져오기
      let start_date_str = $(this).data('start-date');
      let end_date_str = $(this).data('end-date');

      // progress_date의 left 위치 설정
      let start_element = $('.time_week_days li[data-date="' + start_date_str + '"]');
      let end_element = $('.time_week_days li[data-date="' + end_date_str + '"]');

      if (start_element.length === 0) {
        return;
      }

      let start_left = start_element.position().left;

      // end_element를 찾을 수 없는 경우 time_week_days의 마지막 요소로 설정
      if (end_element.length === 0) {
        end_element = $('.time_week_days li').last();

        // 마지막 요소일 경우에만 10px 추가
        let end_left = end_element.position().left;
        let width = end_left - start_left + $('.time_week_days li').outerWidth() + 40;
        $(this).css({
          left: start_left + 'px',
          width: width + 'px',
        });
      } else {
        let end_left = end_element.position().left;

        // progress_date의 너비 설정
        let width = end_left - start_left + $('.time_week_days li').outerWidth();
        $(this).css({
          left: start_left + 'px',
          width: width + 'px',
        });
      }
    });
  }

  // 기존 코드
  /* 
  setDrag();

  function setDrag() {
    let maxX = $('.timeline_wrap .work_title').width();
    let minX = 80;
    let startX = 0;
    let delX = 0;
    let offsetX = 0;
    let isTouched = false;

    $('.width_bar').css({ left: maxX + 'px' });

    $('.width_bar').on('mousedown touchstart', function (e) {
      e = e.clientX === undefined ? e.touches[0] : e;
      startX = e.clientX;
      offsetX = $(this).position().left;
      isTouched = true;
    });

    document.addEventListener('mousemove', move, { passive: false });
    document.addEventListener('touchmove', move, { passive: false });

    function move(e) {
      if (isTouched === false) return false;
      e.preventDefault();
      e = e.clientX === undefined ? e.touches[0] : e;
      delX = e.clientX - startX;
      minLeft();
      maxLeft();

      function maxLeft() {
        // 최대 넓이
        if ($('.width_bar').position().left > maxX) {
          $('.width_bar').css({ left: maxX + 'px' });
          $('.work_title').css({ width: maxX });
        }
      }

      function minLeft() {
        // 최소 넓이
        if ($('.work_title').outerWidth() >= minX || delX > 0) {
          $('.width_bar').css({ left: offsetX + delX + 'px' });
          $('.work_title').css({ width: offsetX + delX + 'px' });
        }
      }

      $(document).on('mouseup touchend', function (e) {
        if (isTouched === true) {
          isTouched = false;
        }
      });
    }
  }

  */

  setDrag();

  function setDrag() {
    let maxX = $('.timeline_wrap .work_title').width();
    let minX = 80;
    let startX = 0;
    let delX = 0;
    let offsetX = 0;
    let isTouched = false;

    $('.width_bar').css({ left: maxX + 'px' });

    $('.width_bar').on('mousedown', startDrag);
    $('.width_bar').on('touchstart', startDrag);

    function startDrag(e) {
      e.preventDefault(); // 기본 동작 방지
      e.stopPropagation(); // 이벤트 전파 중단
      e = e.clientX === undefined ? e.touches[0] : e;
      startX = e.clientX;
      offsetX = $(this).position().left;
      isTouched = true;

      $(document).on('mousemove', move);
      $(document).on('touchmove', move);
      $(document).on('mouseup touchend', stopDrag);
    }

    function move(e) {
      if (!isTouched) return;
      e.preventDefault();
      e.stopPropagation(); // 이벤트 전파 중단
      e = e.clientX === undefined ? e.touches[0] : e;
      delX = e.clientX - startX;
      minLeft();
      maxLeft();
    }

    function minLeft() {
      let newWidth = offsetX + delX;
      if (newWidth >= minX) {
        $('.width_bar').css({ left: newWidth + 'px' });
        $('.work_title').css({ width: newWidth + 'px' });
      }
    }

    function maxLeft() {
      if ($('.width_bar').position().left > maxX) {
        $('.width_bar').css({ left: maxX + 'px' });
        $('.work_title').css({ width: maxX });
      }
    }

    function stopDrag(e) {
      if (isTouched) {
        e.preventDefault(); // 기본 동작 방지
        e.stopPropagation(); // 이벤트 전파 중단
        isTouched = false;
        $(document).off('mousemove', move);
        $(document).off('touchmove', move);
        $(document).off('mouseup touchend', stopDrag);
      }
    }
  }
});
