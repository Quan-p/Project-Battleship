class newElement {
    static createElement(selector, classNames) {
        const element = document.createElement(selector);

        if (classNames !== undefined) {
            if (Array.isArray(classNames)) {
                for (let i = 0; i < classNames.length; i += 1) {
                    element.classList.add(classNames[i]);
                }
            } else {
                element.classList.add(classNames);
            }
        }
        return element;
    }
}

export default newElement;
