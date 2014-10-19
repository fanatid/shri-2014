(function($) {
  var equalizers = {}

  function runOnce(equalizer, duration) {
    var equalizerHeight = equalizer.height()

    var deferreds = equalizer.find('span').map(function() {
      var defer = new $.Deferred()
      var prop = { height: Math.round(equalizerHeight * Math.random()) }
      $(this).animate(prop, duration, 'linear', defer.resolve)
      return defer
    })

    $.when.apply($.when, deferreds).done(function() {
      var prop = { height: equalizerHeight/2 }
      var deferreds = equalizer.find('span').map(function() {
        var defer = new $.Deferred()
        $(this).animate(prop, duration, 'linear', defer.resolve)
        return defer
      })

      $.when.apply($.when, deferreds).done(function() {
        if (equalizers[equalizer.selector])
          runOnce(equalizer, duration)
      })
    })
  }

  function equalizerStart(equalizer, options) {
    equalizer.css({
      verticalAlign: 'bottom',
      lineHeight: equalizer.height() + 'px'
    })

    var span = $('<span/>').css({
      verticalAlign: 'bottom',
      display: 'inline-block',

      fontSize: 0,
      lineHeight: 0,

      width: options.step,
      height: equalizer.height()/2,
      background: 'pink',
      borderTop: '2px solid red'
    })

    var colQuantity = Math.ceil(equalizer.width() / options.step)
    while (colQuantity--)
      span.clone().appendTo(equalizer)

    equalizers[equalizer.selector] = true
    runOnce(equalizer, Math.ceil(options.duration/2))
  }

  function equalizerStop(equalizer) {
    delete equalizers[equalizer.selector]
  }

  $.fn.equalizer = function(action, options) {
    if (action === 'start')
      equalizerStart(this, $.extend({}, $.fn.equalizer.defaults, options))

    if (action === 'stop')
      equalizerStop(this)

    return this
  }

  $.fn.equalizer.defaults = {
    duration: 2000,
    step: 2
  }

})(jQuery)

$(document).ready(function() {
  $('#eq_1 .equalizer').equalizer('start')
  $('#eq_2 .equalizer').equalizer('start')
  $('#eq_3 .equalizer').equalizer('start')
})
