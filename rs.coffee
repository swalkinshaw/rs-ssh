__         = Zepto
username   = 'root'
address    = 'td[data-column_name="Public DNS"] a'
ssh_button = 'a[href*="managed_ssh"]'
dom_ref    = '.icon_ssh'
retry_rate = 100

dom_check = () ->
  __(dom_ref).length

setup = () ->
  replace_ssh_event_handler()

  __('body').on 'DOMNodeInserted', (e) ->
    if dom_check() then replace_ssh_event_handler()

replace_ssh_event_handler = () ->
  __(ssh_button).removeAttr 'data-behaves'

  __('body').on 'click', ssh_button, (e) ->
    host            = __(this).closest('tr').find(address).text().trim()
    window.location = "ssh://#{username}@#{host}"
    return false

init = () ->
  if dom_check() then setup() else setTimeout init, retry_rate

init()
