$(document).ready(function() {
  // 슬라이드의 첫 번째 항목을 제외하고 숨김
  $('.main_slide ul li:gt(0)').hide();

  // 4초마다 슬라이드 변경 애니메이션 (fade 효과)
  setInterval(function() {
    $('.main_slide ul li:first')
      .fadeOut()              // 현재 첫 번째 항목을 사라지게 함
      .next('li').fadeIn()     // 다음 항목을 나타나게 함
      .end()                  // 이전 선택자 작업 완료
      .appendTo('.main_slide ul');  // 첫 번째 항목을 마지막으로 이동
  }, 4000);  // 4초마다 변경
});

// Swiper 설정 (커버플로우 효과)
var swiper = new Swiper(".mySwiper", {
  effect: "coverflow",            // 커버플로우 효과 적용
  grabCursor: true,               // 마우스 커서를 'grab'로 변경
  centeredSlides: true,           // 슬라이드가 중앙에 위치
  slidesPerView: "auto",          // 화면에 보여질 슬라이드 수 자동 설정
  coverflowEffect: {
    rotate: 50,                   // 슬라이드 회전 각도
    stretch: 0,                   // 슬라이드 간 거리 조정
    depth: 100,                   // 슬라이드 깊이감
    modifier: 1,                  // 효과 강도 조절
    slideShadows: true,           // 슬라이드 그림자 효과
  },
  autoplay: {
    delay: 2000,                  // 2초마다 자동 슬라이드
    disableOnInteraction: false,  // 사용자 상호작용 후에도 자동 슬라이드 유지
  },
  pagination: {
    el: ".swiper-pagination",     // 페이지네이션 엘리먼트
  },
});

// 드래그할 때 파란색 선택 영역이 보이지 않도록 스타일 적용
document.querySelector(".mySwiper").style.userSelect = "none";

// 드래그 관련 변수 초기화
let isDragging = false;
const slider = $(".mySwiper"); // 슬라이더 엘리먼트 선택
const list = slider.find('.swiper-wrapper'); // 슬라이드 리스트 선택
const threshold = 20; // 드래그 인식 임계값

// 드래그 시작 이벤트 처리
$(document).on('mousedown', function() {
  isDragging = true; // 드래그 상태 활성화
  slider.addClass('dragging'); // 드래그 상태로 커서 변경
});

// 드래그 후 슬라이더 위치 조정 및 애니메이션
$(document).on('mouseup', function() {
  if (isDragging) {
    $(document).off('mousemove');     // 마우스 이동 이벤트 해제
    $(document).off('mouseup');       // 마우스 업 이벤트 해제
    slider.removeClass('dragging');   // 드래그 종료 시 커서 원래 상태로 복구

    // 드래그 종료 후 애니메이션 적용
    list.css('transition', 'transform 0.3s ease-out');

    // 드래그 후 최적 위치로 이동
    let currentPosition = list.position().left;
    let sliderWidth = slider.width();
    let listWidth = list.width();
    let moveTo;

    // 슬라이더 위치가 끝에 근접했을 경우
    if (Math.abs(currentPosition - (sliderWidth - listWidth)) < threshold) {
      moveTo = sliderWidth - listWidth;  // 우측 끝으로 이동
    } else if (Math.abs(currentPosition) < threshold) {
      moveTo = 0;  // 좌측 끝으로 이동
    } else {
      moveTo = currentPosition;  // 중간 위치 유지
    }

    // 슬라이더 이동 애니메이션 적용
    list.css('transform', 'translateX(' + moveTo + 'px)');
    isDragging = false;  // 드래그 상태 해제
  }
});

// 드래그 중 마우스 이동 이벤트 처리 (필요할 경우 추가)
$(document).on('mousemove', function(event) {
  if (isDragging) {
    // 드래그 중인 경우의 로직 추가 가능
  }
});
