$(document).ready(function() {
  // bers 버튼 클릭 시 nav와 lang_list의 open 클래스 토글 및 아이콘 색상 변경
  $('.bers').on('click', function() {
    $('.nav').toggleClass('open');
    $('.lang_list').toggleClass('open');

    // nav가 열려 있는지 확인하고 패딩 및 bers의 아이콘 색상 조정
    if ($('.nav').hasClass('open')) {
      $('.nav li').css('padding-left', '0'); // 패딩 제거
      $('.bers i').css('color', '#000000'); // 아이콘 색상을 검정으로 변경
      $('body').css('overflow', 'hidden'); // 스크롤 막기
    } else {
      $('.nav li').css('padding-left', '40px'); // 패딩 복원
      $('.bers i').css('color', '#ffffff'); // 아이콘 색상을 흰색으로 복원
      $('body').css('overflow', ''); // 스크롤 다시 활성화
    }
  });

  // 브라우저 크기 변경 시 open 클래스 자동 제거 및 아이콘 색상 복원
  $(window).on('resize', function() {
    var windowWidth = $(window).width();

    if (windowWidth > 1024) { // 1024px 이상일 때 open 클래스 제거
      $('.nav').removeClass('open');
      $('.lang_list').removeClass('open');
      $('.nav li').css('padding-left', '40px'); // 패딩 복원
      $('.bers i').css('color', '#ffffff'); // 아이콘 색상 흰색으로 복원
      $('body').css('overflow', ''); // 스크롤 다시 활성화
    }
  });
});
