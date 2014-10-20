$(document).ready(function() {
  var n = 250
  var cursorR = 20

  var width = $(window).width()
  var height = $(window).height()

  var svg = d3.select('body').append('svg')
    .on('mousemove', mousemove)

  var cursor = svg.append('circle')
    .attr('fill', 'black')
    .attr('r', cursorR)
    .attr('cx', -100)
    .attr('cy', -100)

  function mousemove() {
    var point = d3.mouse(this)

    cursor
      .attr('cx', point[0])
      .attr('cy', point[1])
  }

  var pointsData = d3.range(n+1).map(function() {
    var vec = Math.random() * Math.PI
    return {
      cx: 5 + Math.random() * width * 0.9,
      cy: 5 + Math.random() * height * 0.9,
      radius: 5 + Math.random() * 5,
      vx: Math.cos(vec),
      vy: Math.sin(vec),
      speed: (0.05 + 0.05*Math.random()) * Math.sqrt(width * width + height * height),
      color: Math.random() * 256,
      colorSpeed: (128 + Math.random() * 128) * (Math.random() > 0.5 ? 1 : -1)
    }
  })

  var points = svg.selectAll('circle')
    .data(pointsData)
    .enter()
    .append('circle')
    .each(function(data) { d3.select(this).attr('r', data.radius) })

  var lastTime = Date.now()
  d3.timer(function() {
    var startTime = Date.now()
    var deltaTime = (startTime - lastTime)/1000

    var cursorX = cursor.attr('cx')
    var cursorY = cursor.attr('cy')

    pointsData.forEach(function(data) {
      data.color = data.color + data.colorSpeed * deltaTime
      if (data.color < 0 || data.color > 255) {
        if (data.color < 0)
          data.color = 0
        else
          data.color = 255

        data.colorSpeed = -data.colorSpeed
      }

      var ncx = data.cx + data.vx * data.speed * deltaTime
      if (ncx < data.radius || ncx > width - data.radius) {
        if (ncx < data.radius)
          ncx = data.radius + data.radius - ncx
        else
          ncx = width - data.radius - (data.radius - (width - ncx))

        data.vx = -data.vx

      }
      data.cx = ncx

      var ncy = data.cy + data.vy * data.speed * deltaTime
      if (ncy < data.radius || ncy > height - data.radius) {
        if (ncy < data.radius)
          ncy = data.radius + data.radius - ncy
        else
          ncy = height - data.radius - (data.radius - (height - ncy))

        data.vy = -data.vy

      }
      data.cy = ncy

      var distance = Math.sqrt(Math.pow(cursorX - data.cx, 2) + Math.pow(cursorY - data.cy, 2))
      if (distance < cursorR*1.05 + data.radius) {
        var tmpx = data.vx - (cursorX - data.cx) / distance
        var tmpy = data.vy - (cursorY - data.cy) / distance
        var k = Math.sqrt(tmpx*tmpx + tmpy*tmpy)
        data.vx = tmpx/k
        data.vy = tmpy/k
      }
    })

    points.each(function(data) {
      var color = Math.ceil(data.color).toString(16)
      if (color.length < 2)
        color = '0' + color
      color = '#ff' + color + '00'

      d3.select(this)
        .attr('fill', color)
        .attr('cx', data.cx)
        .attr('cy', data.cy)
    })

    lastTime = startTime
  })
})
