const easeInOutQuad = function(t, b, c, d) {
  t /= d / 2;
  if (t < 1) return (c / 2) * t * t + b;
  t--;
  return (-c / 2) * (t * (t - 2) - 1) + b;
};

window.animatedScrollLeft = (element, to, duration, callback) => {
  let start = element.scrollLeft,
    change = to - start,
    animationStart = +new Date();
  let animating = true;
  let lastpos = null;

  let animateScroll = function() {
    if (!animating) {
      return;
    }
    requestAnimationFrame(animateScroll);
    let now = +new Date();
    let val = Math.floor(
      easeInOutQuad(now - animationStart, start, change, duration)
    );

    if (lastpos) {
      if (lastpos === element.scrollLeft) {
        lastpos = val;
        element.scrollLeft = val;
      } else {
        animating = false;
      }
    } else {
      lastpos = val;
      element.scrollLeft = val;
    }
    if (now > animationStart + duration) {
      element.scrollLeft = to;
      animating = false;
      if (callback) {
        callback();
      }
    }
  };

  requestAnimationFrame(animateScroll);
};
