# This is a manifest file that'll be compiled into application.js, which will include all the files
# listed below.
#
# Any JavaScript/Coffee file within this directory, lib/assets/javascripts, or any plugin's
# vendor/assets/javascripts directory can be referenced here using a relative path.
#
# It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
# compiled file. JavaScript code in this file should be added after the last require_* statement.
#
# Read Sprockets README (https:#github.com/rails/sprockets#sprockets-directives) for details
# about supported directives.
#
#= require rails-ujs
# require turbolinks
#= require jquery3
#= require jquery_ujs
#= require popper
#= require bootstrap
#= require bootstrap-sprockets
#= require vendor/home1
#= require vendor/home2
#= require vendor/init
#= require_tree .

window.recaptchaChecked = false
window.recaptchaCallback = ->
  window.recaptchaChecked = true

$ ->
  $('[data-toggle="tooltip"]').tooltip()
  
  $('#avatar').on 'change', ->
    console.log('changed')
    { name } = this.files[0]
    $('label[for="avatar"]').text(name)
    $('#avatar').blur()

  $.ajaxSetup({
    headers: {
      'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')['content']
    }
  })


