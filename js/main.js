$(document).ready(function() {
  //main_news 슬라이더
  let startX, currentX, initialPosition;
  let slider = $('.news_slider');
  let list = $('.news_list');
  let isDragging = false;
  let threshold = 50; // 드래그 거리 기준

  slider.on('mousedown', function(event) {
    event.preventDefault();    //슬라이더 마우스 업다운적용
    startX = event.pageX;
    initialPosition = list.position().left;
    isDragging = true;
    slider.addClass('dragging'); // 드래그 중 커서 변경

    $(document).on('mousemove', function (event) {
      if (isDragging) {
        currentX = event.pageX;
        let moveX = currentX - startX;
        let newPosition = initialPosition + moveX;

        // 슬라이더 이동 범위 제한
        let sliderWidth = slider.width();
        let listWidth = list.width();                               //슬라이더 끝여백 조절
        let w = $(window).width();
        console.log(w * -1);
        //newPosition = Math.min(0, Math.max(newPosition, sliderWidth - listWidth));
        if (newPosition > 0) {
          newPosition = 0;
        }
        if ($(window).width() < 767) {
          if (newPosition < (w * -1.5)) {
            newPosition = w * -1.5;
          }
        } else if ($(window).width() < 1024) {
          if (newPosition < (w * -1)) {
            newPosition = w * -1;
          }
        }
        else if ($(window).width() < 1440) {
          if (newPosition < (w * -1)) {
            newPosition = w * -1;
          }
        } else {
          newPosition = Math.min(0, Math.max(newPosition, sliderWidth - listWidth + 30));
        }
        // `transform` 속성을 부드럽게 이동하도록 설정
        list.css('transition', 'none'); // 이동 중에 transition 비활성화
        list.css('transform', 'translateX(' + newPosition + 'px)');
      }
    });
  });
});
