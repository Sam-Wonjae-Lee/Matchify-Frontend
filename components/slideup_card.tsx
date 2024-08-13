interface SlideupCardProps {
    id: string;
    first: string;
    firstFunc: () => void
    second: string;
    secondFunc: () => void
    third: string
    thirdFunc: () => void
}

const showSlideupCard = (id: string) => {
    const sliderElement = document.getElementById(id);

    if (sliderElement) {
        sliderElement.style.display = "block";
        sliderElement.classList.remove("animate-slideDown");
        sliderElement.classList.add("animate-slideUp");
        console.log("Slider wdwdd");
    } else {
        console.log("Slider element not found");
    }
}

const SlideupCard: React.FC<SlideupCardProps> = ({ id, first, second, third, firstFunc, secondFunc, thirdFunc }) => {

    const removeSlider = () => {
        const sliderElement = document.getElementById(id);

        if (sliderElement) {
            sliderElement.classList.remove("animate-slideUp");
            sliderElement.classList.add("animate-slideDown");
        } else {
            console.log("Slider element not found");
        }
    }

    const pressDownHighlight = (id: string) => {
        const sliderPart = document.getElementById(id);

        if(sliderPart) {
            sliderPart.style.backgroundColor = "rgb(75, 85, 99)";
            sliderPart.style.borderRadius = "0.5rem";
        }
    }

    const pressUpHighlight = (id: string) => {
        const sliderPart = document.getElementById(id);

        if(sliderPart) {
            sliderPart.style.backgroundColor = "rgb(107, 114, 128)";
            sliderPart.style.borderRadius = "0.5rem";
        }
    }

    return (
      <div id={id} className="hidden rounded-lg fixed w-full h-1/4 bg-gray-500 bottom-0">
          <button id={id + "1"} className="flex flex-col items-center w-full h-[32%]" onClick={() => {
              removeSlider();
              firstFunc();
          }}
          onTouchStart={() => pressDownHighlight(id + "1")} onTouchEnd={() => pressUpHighlight(id + "1")}>
              <div className="w-1/4 h-4 bg-gray-100 rounded-lg mt-4">
              </div>
              <div className="mt-2">
                  {first}
              </div>
          </button>
          <button id={id + "2"} className="w-full h-[33%]" onTouchStart={() => pressDownHighlight(id + "2")} onTouchEnd={() => pressUpHighlight(id + "2")} onClick={() => {
            removeSlider();
            secondFunc();
          }}>
              {second}
          </button>
          <button id={id + "3"} className="w-full h-[35%] text-center text-red-500" onTouchStart={() => pressDownHighlight(id + "3")} onTouchEnd={() => pressUpHighlight(id + "3")} onClick={() => {
            removeSlider();
            thirdFunc();
          }}>
              {third}
          </button>
      </div>
    );
  }

export {SlideupCard, showSlideupCard};