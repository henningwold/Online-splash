var lastClick
, docLocHref    = document.location.href
, pageRequest   = docLocHref.substring(docLocHref.indexOf('#') + 1, docLocHref.length)
, open_window
, change_page;
  


open_window = function (section_id) {
  var guide_background    = document.createElement('div')
  , guide                 = document.createElement('div')
  , guide_inner           = document.createElement('div')
  , guide_close           = document.createElement('div');

  guide_inner.innerHTML   = $(section_id).html();
  guide_close.innerHTML   = '<img src="graphics/close.png" alt="close">';

  guide_background.setAttribute('id', 'guide_background');
  guide.setAttribute('id', 'guide');
  guide_inner.setAttribute('class', 'guide_inner');
  guide_close.setAttribute('class', 'guide_close');

  guide.appendChild(guide_inner);
  guide_background.appendChild(guide_close);
  guide_background.appendChild(guide);

  $('body').append(guide_background).hide().fadeIn(400);

  $(guide_background).click(function() {
    $(guide_background).fadeOut(300, function() {
      $(this).remove();
    });
  });

  $(guide_close).click(function() {
    $(guide_background).fadeOut(300, function() {
      $(this).remove();
    });
  });

  $(guide).click(function(e) {
    e.stopPropagation();
  });
  innerScroll = new iScroll(guide_inner);
}

change_page = function(name) {
  
  $('#content').fadeOut(180, function() {
    $('#content').html( $('#'+name).html()).fadeIn();
  });

  lastClick.removeClass('on');
  lastClick = $('#link_'+name);
  lastClick.addClass('on');
}








lastClick = $('#link_online');

switch (pageRequest) {
  case 'join':                change_page('join');    break;
  case 'mer':                 change_page('mer');     break;
  case 'fadderukene':         change_page('fadderukene'); break;
  case 'cal':                 change_page('cal');     break;
  default:
    change_page('online');
}

$('nav a').click(function(event) {
  switch (this.id) {
    case 'link_online':       change_page('online');    break
    case 'link_join':         change_page('join');    break;
    case 'link_fadderukene':  change_page('fadderukene'); break;
    case 'link_mer':          change_page('mer');     break;
    case 'link_cal':          change_page('cal');     break;

    default:
      change_page('online');
  }
});

var isIOS = navigator.userAgent.match(/(iPod|iPhone|iPad)/);
var click_event = isIOS ? 'touchend' : 'click';

$(document).on(click_event, '.cal-left ul li', function (e) {
  $('#cal-content').html($('article', this).html());
});

if (isIOS) {
  $(document).on(click_event, '.cal li', function() {
    var isHidden = $('div', this).hasClass('hidden');
    $('.calendar li div').addClass('hidden');
    if (isHidden) {
      $('div', this).removeClass('hidden');
    }
  });
}
