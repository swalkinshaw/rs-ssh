(function() {
  var address, dom_check, dom_ref, init, replace_ssh_event_handler, retry_rate, setup, ssh_button, username, __;

  __ = Zepto;

  username = 'root';

  address = 'td[data-column_name="Public DNS"] a';

  ssh_button = 'a[href*="managed_ssh"]';

  dom_ref = '.icon_ssh';

  retry_rate = 100;

  dom_check = function() {
    return __(dom_ref).length;
  };

  setup = function() {
    replace_ssh_event_handler();
    return __('body').on('DOMNodeInserted', function(e) {
      if (dom_check()) return replace_ssh_event_handler();
    });
  };

  replace_ssh_event_handler = function() {
    __(ssh_button).removeAttr('data-behaves');
    return __('body').on('click', ssh_button, function(e) {
      var host;
      host = __(this).closest('tr').find(address).text().trim();
      window.location = "ssh://" + username + "@" + host;
      return false;
    });
  };

  init = function() {
    if (dom_check()) {
      return setup();
    } else {
      return setTimeout(init, retry_rate);
    }
  };

  init();

}).call(this);
