$(document).ready(function() {
  let autoSlideInterval;

  // 화면 크기 확인 및 슬라이더 활성화/비활성화
  function handleSlider() {
    if ($(window).width() <= 767) {
      // 슬라이더 활성화
      let isDragging = false;
      let startPos = 0;
      let currentTranslate = 0;
      const slideWidth = $('.hover_content li').outerWidth(true); // 슬라이더 아이템의 너비
      let totalSlides = $('.hover_content li').length;
      
      // 드래그로 슬라이더 이동
      $('.hover_content').on('mousedown touchstart', function(e) {
        e.preventDefault();  // 기본 동작 방지
        clearInterval(autoSlideInterval);  // 자동 슬라이드 멈춤
        isDragging = true;
        startPos = e.pageX || e.originalEvent.touches[0].pageX;
        $(this).css('cursor', 'grabbing');
      });

      $(document).on('mousemove touchmove', function(e) {
        if (isDragging) {
          e.preventDefault();  // 기본 동작 방지
          let currentPos = e.pageX || e.originalEvent.touches[0].pageX;
          let diff = currentPos - startPos;
          currentTranslate += diff;

          // 화면 크기에 따른 %로 translateX 계산
          let windowWidth = $(window).width();
          let minTranslate, maxTranslate;

          if (windowWidth <= 670) {
            minTranslate = -(windowWidth * 1);
          
          } else if (windowWidth <= 700) {
            // 700px 이하에서는 화면 너비의 50%까지만 이동 가능
            minTranslate = -(windowWidth * 0.5);
          
          } else {
            // 그 외의 경우에는 기본적으로 50%까지 이동 가능
            minTranslate = -(windowWidth * 0.5);
          }

          maxTranslate = -32; // 최대 translateX 값

          // translateX 값 제한
          if (currentTranslate < minTranslate) {
            $('.hover_content').css('transform', `translateX(${minTranslate}px)`);
            currentTranslate = minTranslate;
          } else if (currentTranslate > maxTranslate) {
            $('.hover_content').css('transform', `translateX(${maxTranslate}px)`);
            currentTranslate = maxTranslate;
          } else {
            $('.hover_content').css('transform', `translateX(${currentTranslate}px)`);
          }
          startPos = currentPos;
        }
      });

      $(document).on('mouseup touchend', function() {
        isDragging = false;
        $('.hover_content').css('cursor', 'grab');
      });

    } else {
      // 슬라이더 비활성화
      $('.hover_content').off('mousedown touchstart mousemove touchmove mouseup touchend');
      $('.hover_content').css('transform', 'none');  // 초기화
      clearInterval(autoSlideInterval);  // 자동 슬라이드 멈춤
    }
  }

  // 페이지 로드 시 및 리사이즈 시 슬라이더 핸들링
  handleSlider();
  $(window).resize(function() {
    handleSlider();
  });
});
