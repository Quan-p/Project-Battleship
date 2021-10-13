class makeElement {
    static newElement(selector, className) {
        const element = document.newElement(selector);

        if (className !== undefined) {
            if (Array.isArray(className)) {
                for (let i = 0; i < className.length; i += 1) {
                    element.classList.add(className[i]);
                }
            } else {
                element.classList.add(className);
            }
        }
        return element;
    }
}

export default makeElement;
