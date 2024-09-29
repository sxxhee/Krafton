$(document).ready(function(){
  $('.video-button').click(function(){
    $(this).find('img').remove();  // .video-button 안의 img 요소만 제거
  });
});