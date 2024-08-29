interface AreYouSureCardProps {
    id: string;
    text: string;
    buttonName: string;
    buttonFunc?: any;
}

const showAreYouSureCard = (id: string) => {

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

const AreYouSureCard: React.FC<AreYouSureCardProps> = ({ id, text, buttonName, buttonFunc }) => {

    const removeSlider = () => {
        const sliderElement = document.getElementById(id);

        if (sliderElement) {
            sliderElement.style.display = "none";
            console.log(sliderElement.style.display);
        } else {
            console.log("Slider element not found");
        }
    }

    // TODO LATER LOL
    // const pressDownHighlight = (id: string) => {
    //     const sliderPart = document.getElementById(id);

    //     if(sliderPart) {
    //         sliderPart.style.backgroundColor = "rgb(75, 85, 99)";
    //         sliderPart.style.borderRadius = "0.5rem";
    //     }
    // }

    // const pressUpHighlight = (id: string) => {
    //     const sliderPart = document.getElementById(id);

    //     if(sliderPart) {
    //         sliderPart.style.backgroundColor = "rgb(107, 114, 128)";
    //         sliderPart.style.borderRadius = "0.5rem";
    //     }
    // }

    return (
        <div id={id} className="flex flex-col items-center justify-center hidden rounded-lg fixed w-[70%] bg-[#535353] mt-[15vh] z-20">
            <p className="text-center w-3/4 mx-auto text-sm mt-2 text-[#DADEDB]">{text}</p>
            <div className="flex w-full justify-center space-x-4 mt-2 mb-4">
                <button className="bg-red-500 text-white py-2 px-4 rounded text-sm" onClick={ () => {
                    removeSlider();
                    buttonFunc ? buttonFunc() : console.log("Button has no action");
                }}>{buttonName}</button>
                <button className="bg-white text-[#535353] py-2 px-4 rounded text-sm" onClick={() => {
                    removeSlider();
                    console.log("POWKODK");
                }}>Cancel</button>
            </div>
        </div>
    );
}

export {AreYouSureCard, showAreYouSureCard};