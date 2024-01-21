const defaultPercentage = 67;
let currentPercentage = 0;

document.addEventListener("DOMContentLoaded", function () {
  generateIndicators(12);
  animateNeedle(0, 100, 150, function () {
    setTimeout(function () {
      animateNeedle(100, defaultPercentage, 150);
    }, 1000);
  });

  animatePercentage(0, defaultPercentage, 2000);
});

// Generating indicators for the meter
function generateIndicators(count) {
  const indicatorsContainer = document.querySelector('.indicators');
  const indicatorDegreeStep = 180 / count;

  for (let i = 0; i <= count; i++) {
    const degree = i * indicatorDegreeStep;
    createIndicator(indicatorsContainer, degree);
  }
}

function createIndicator(container, degree) {
  const indicator = document.createElement('div');
  indicator.classList.add('indicator');
  indicator.style.transform = `translateX(-50%) rotate(${degree}deg)`;
  container.appendChild(indicator);
}

function animatePercentage(startValue, endValue, duration, onComplete) {
  let startTime;
  const percentageElement = document.getElementById("percentage");

  function updatePercentageAnimation(currentTime) {
    if (!startTime) startTime = currentTime;
    const progress = (currentTime - startTime) / duration;
    const value = startValue + progress * (endValue - startValue);

    percentageElement.textContent = Math.round(value) + "%";
    currentPercentage = value;

    if (progress < 1) {
      requestAnimationFrame(updatePercentageAnimation);
    } else {
      if (onComplete) onComplete();
    }
  }

  requestAnimationFrame(updatePercentageAnimation);
}

function animateNeedle(startValue, endValue, duration, onComplete) {
  let startTime;
  const needle = document.getElementById("needle");

  function updateAnimation(currentTime) {
    if (!startTime) startTime = currentTime;
    const progress = (currentTime - startTime) / duration;
    const value = startValue + progress * (endValue - startValue);

    updateMeter(value);

    if (progress < 1) {
      requestAnimationFrame(updateAnimation);
    } else {
      if (onComplete) onComplete();
    }
  }

  requestAnimationFrame(updateAnimation);
}

function updateMeter(value) {
  value = Math.max(0, Math.min(100, value));
  document.getElementById("needle").style.transform =
    "translateX(-50%) rotate(" + (270 + value * 1.8) + "deg)";
}

function updateMeterAndPercentage(value) {
  if (!value || (parseInt(value) <= 100 && parseInt(value) >= 0)) {
    updateMeter(value);
    animatePercentage(currentPercentage, value, 2000);
  } else {
    // Revert back to old value
    $("#inputValue").val($("#inputValue").data("old"));
    console.log($("#inputValue").data());
  }
}

$(function () {
  $("#inputValue").keydown(function () {
    // Save old value.
    if (
      !$(this).val() ||
      (parseInt($(this).val()) <= 100 && parseInt($(this).val()) >= 0)
    )
      $(this).data("old", $(this).val());
  });
  $("#inputValue").keyup(function () {
    // Check correct, else revert back to old value.
    if (
      !$(this).val() ||
      (parseInt($(this).val()) <= 100 && parseInt($(this).val()) >= 0)
    );
    else $(this).val($(this).data("old"));
  });
});
