document.addEventListener("DOMContentLoaded", () => {
  const track = document.getElementById("slide-track");
  window.onmousedown = (e) => {
    console.log(e.clientX);
    track.dataset.mouseDownAt = e.clientX;
  };
  window.onmousemove = (e) => {
    if (track.dataset.mouseDownAt === "0") return;
    const mouseDelta = parseFloat(track.dataset.mouseDownAt) - e.clientX,
      maxDelta = window.innerWidth;
    const percentage = (mouseDelta / maxDelta) * -100,
      nextPercentageUncontrolled =
        parseFloat(track.dataset.prevPercentage) + percentage,
      nextPercentage = Math.max(Math.min(nextPercentageUncontrolled, 0), -100);
    track.dataset.percentage = nextPercentage;
    track.animate(
      {
        transform: `translate(${nextPercentage}%, -50%)`,
      },
      { duration: 1200, fill: "forwards" }
    );
    for (const image of track.getElementsByClassName("image")) {
      image.animate(
        {
          objectPosition: `${100 + nextPercentage}% center`,
        },
        { duration: 1200, fill: "forwards" }
      );
    }
  };
  window.onmouseup = (e) => {
    track.dataset.mouseDownAt = 0;
    track.dataset.prevPercentage = track.dataset.percentage;
  };
});
