(function() {
  var address, bind_ssh_handler, dom_ref, init, retry_rate, ssh_button, username, __;

  __ = Zepto;

  username = 'root';

  address = 'td[data-column_name="Public DNS"] a';

  ssh_button = 'a[href*="managed_ssh"]';

  dom_ref = '.icon_ssh';

  retry_rate = 100;

  init = function() {
    if (__(dom_ref).length) {
      return bind_ssh_handler();
    } else {
      return setTimeout(init, retry_rate);
    }
  };

  bind_ssh_handler = function() {
    return __(ssh_button).on('click', function(e) {
      var host;
      e.preventDefault();
      e.stopPropagation();
      host = __(this).closest('tr').find(address).text().trim();
      return window.location = "ssh://" + username + "@" + host;
    });
  };

  init();

}).call(this);
