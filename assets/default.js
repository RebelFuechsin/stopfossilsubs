;(function () {
  function getColorsFromBackgroundImageGradient() {
    return Array.from(
      getComputedStyle(document.body).
        getPropertyValue('background-image').
        matchAll(/rgb\((\d+), *(\d+), *(\d+)\)/g),
      (match) => {
        return match.slice(1).map((value) => {
          return parseInt(value, 10)
        })
      }
    )
  }

  function interpolate(from, to, position) {
    return [...Array(3).keys()].map(index => {
      return Math.round(to[index] * position + from[index] * (1 - position))
    })
  }

  let colors

  function setBackgroundColor() {
    const position = Math.min(1, Math.max(0,
      window.scrollY / (document.body.offsetHeight - window.innerHeight) || 0
    ))
    const color = `rgb(${interpolate(colors[0], colors[1], position).join(', ')})`
    document.body.style.backgroundColor = color
  }

  function getColorsFromBackgroundImageGradientAndSetBackgroundColor() {
    colors = getColorsFromBackgroundImageGradient()
    setBackgroundColor()
  }

  window.addEventListener('DOMContentLoaded', () => {
    getColorsFromBackgroundImageGradientAndSetBackgroundColor()
  })

  if (window.matchMedia) {
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
      getColorsFromBackgroundImageGradientAndSetBackgroundColor()
    })
  }

  document.addEventListener('scroll', setBackgroundColor)
})()

document.querySelectorAll('a, label, button').forEach(element => {
  element.addEventListener('touchstart', () => {})
})
