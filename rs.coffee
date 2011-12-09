__         = Zepto
username   = 'root'
address    = 'td[data-column_name="Public DNS"] a'
ssh_button = 'a[href*="managed_ssh"]'
dom_ref    = '.icon_ssh'
retry_rate = 100

init = () ->
  if __(dom_ref).length then bind_ssh_handler() else setTimeout(init, retry_rate)

bind_ssh_handler = () ->
  __(ssh_button).on 'click', (e) ->
    e.preventDefault()
    e.stopPropagation()
    host            = __(this).closest('tr').find(address).text().trim()
    window.location = "ssh://#{username}@#{host}"

init()
