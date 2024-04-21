const createElement = (tagName, { classes, style, textContent, nodesToAppend } = {}) => {
    const element = document.createElement(tagName);
    if (classes) {
        element.classList.add(...classes);
    }
    if (style) {
        Object.assign(element.style, style);
    }
    if (textContent) {
        element.textContent = textContent;
    }
    if (nodesToAppend) {
        element.append(...nodesToAppend);
    }
    return element;
};
