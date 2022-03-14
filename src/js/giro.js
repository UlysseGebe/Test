const text = document.querySelector("#text");
let children = text.children;
let listInput = [];
let coefficient = 4;

const spanGeneration = (element) => {
    text.innerHTML = ''
    for (let i = 0; i < element.length; i++) {
        const el = element[i];
        text.innerHTML += `<span id="span${i+1}" >${el}</span>`
    }
}

function letter() {
    window.addEventListener("deviceorientation", function (event) {
      var value = document.querySelector("#input").value;

      if (event.gamma > 0) {
          text.style.flexDirection = "row";
          spanGeneration(value)
          for (let i = 0; i < children.length; i++) {
              const child = children[i];
              child.style.fontVariationSettings = "'wght' " + Math.round(event.gamma * (coefficient * (i+1)) + 100);
              child.style.order = i - children.length;
        }
      }

      if (event.gamma < 0) {
        text.style.flexDirection = "row-reverse";
        text.innerHTML = ''
        let reverse = value.split('').reverse()
        for (let i = 0; i < reverse.length; i++) {
            const el = reverse[i];
            text.innerHTML += `<span id="span${i+1}" style="color: red;">${el}</span>`
        }
        for (let i = 0; i < children.length; i++) {
            const child = children[i];
            child.style.fontVariationSettings = "'wght' " + Math.round((-1 * event.gamma) * (coefficient * (i+1)) + 100);
            child.style.order = i - children.length;
        }
      }
    });
  }


function init() {
    function getAccel() {
        if (typeof DeviceMotionEvent.requestPermission === 'function') {
            DeviceMotionEvent.requestPermission().then((response) => {
                if (response == "granted") { letter(); }
            });
        } else {
            letter();
        }
    }

    document.querySelector("#input").oninput = function () {

        text.style.fontVariationSettings = "'wght' " + 400;

        function mobile() {
            if (screen.width < 1200) {
                getAccel();
            } else {
                letter();
            }
        }

        console.log(screen.width);
        listInput.shift();
        var value = document.querySelector("#input").value;



        listInput.push(value.split(""));
        spanGeneration(listInput[0])

        mobile();
    };
}

requestAnimationFrame(init);