import SpringPhysics from "./spring-physics.js";

const filterAreas = document.querySelectorAll(".filter-area");

const DEFAULT_SPRING_OPTIONS = {
    mass: 2,
    tension: 20,
    friction: 10,
};

class InterActiveDistortionBox {
    element;
    filter;
    simpleSpring;
    freqSpring;
    scaleSpring;
    turbulenceElement;
    displacementElement;
    isAnimating = false;

    constructor(element) {
        this.element = element;
        this.filter = element.querySelector(".filter");
        this.turbulenceElement = element.querySelector("feTurbulence");
        this.displacementElement = element.querySelector("feDisplacementMap");
        this.simpleSpring = new SpringPhysics({
            startAt: 0,
            options: DEFAULT_SPRING_OPTIONS,
            update: ({ value }) => {
                this.element.style.setProperty("--basic", value);
            },
        });
        this.freqSpring = new SpringPhysics({
            startAt: 0.0175,
            options: DEFAULT_SPRING_OPTIONS,
            update: ({ value }) => {
                this.element.style.setProperty("--freq", value);
                this.turbulenceElement.setAttribute("baseFrequency", `${value} 0.0`);
            }
        });
        this.scaleSpring = new SpringPhysics({
            startAt: 0,
            options: DEFAULT_SPRING_OPTIONS,
            update: ({ value }) => {
                this.element.style.setProperty("--scale", value);
                this.displacementElement.setAttribute("scale", value);
            }
        });

        this.element.addEventListener("click", this.#startAnimation.bind(this));

    }

    #startAnimation() {
        if (this.isAnimating) return;
        console.log("start animation");
        this.simpleSpring.to(1);
        this.freqSpring.to(0.0);
        this.scaleSpring.to(100);
        this.isAnimating = true;

        setTimeout(() => {
            console.log("reset animation");
            this.simpleSpring.reset();
            this.freqSpring.reset();
            this.scaleSpring.reset();
            this.isAnimating = false;
        }, 1600);
    }

}

filterAreas.forEach((element) => new InterActiveDistortionBox(element));