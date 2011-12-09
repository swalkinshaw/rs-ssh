function bind_ssh() {
  jQuery('a[href*="managed_ssh"]').click(function (e) {
    var $public_dns = jQuery(this).parent().parent().parent().find('td[data-column_name="Public DNS"] a');
    window.location = 'ssh://root@' + jQuery.trim($public_dns.text());
    return false;
  });
}

function content_loaded() {
  if (document.getElementsByClassName('icon_ssh').length > 0) {
    bind_ssh();
  } else {
    setTimeout(content_loaded, 100);
  }
};

content_loaded();
