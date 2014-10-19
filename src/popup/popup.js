$(document).ready(function() {
  var dialog = document.querySelector('dialog')
  dialogPolyfill.registerDialog(dialog)
  $('#popup-html5').click(function() { dialog.showModal() })
  $('dialog button').click(function() { dialog.close() })

  $('#popup-z-index').click(function() { $('#modal').show() })
  $('#modal button').click(function() { $('#modal').hide() })
})
