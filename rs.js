(function() {
  var address, bind_ssh_handler, dom_check, dom_ref, init, retry_rate, setup, ssh_button, username, __;

  __ = Zepto;

  username = 'root';

  address = 'td[data-column_name="Public DNS"] a';

  ssh_button = 'a[href*="managed_ssh"]';

  dom_ref = '.icon_ssh';

  retry_rate = 100;

  init = function() {
    if (dom_check()) {
      return setup();
    } else {
      return setTimeout(init, retry_rate);
    }
  };

  dom_check = function() {
    return __(dom_ref).length;
  };

  setup = function() {
    bind_ssh_handler();
    return __('body').on('DOMNodeInserted', function(e) {
      if (dom_check()) {
        return __(ssh_button).removeAttr('data-behaves' && bind_ssh_handler());
      }
    });
  };

  bind_ssh_handler = function() {
    __(ssh_button).removeAttr('data-behaves');
    return __('body').on('click', ssh_button, function(e) {
      var host;
      host = __(this).closest('tr').find(address).text().trim();
      window.location = "ssh://" + username + "@" + host;
      return false;
    });
  };

  init();

}).call(this);
