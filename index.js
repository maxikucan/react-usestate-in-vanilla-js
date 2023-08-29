// REACT MODULE
const React = (() => {
    let values = [];
    let index = 0;
    let elementTree = [];

    function useState(initialState) {
        const state = values[index] || initialState;
        const _index = index;

        function setState(newState) {
            values[_index] = newState;
        }

        index++;
        return [state, setState]
    }

    function renderer(component, root) {
        clearHTMLTree(root)
        index = 0;
        const _component = component;

        _component.render();
        elementTree.forEach(element => root.appendChild(element))

        return _component;
    }

    function oneLineTag(tag, options, children) {
        return Object.assign(document.createElement(tag), { ...options, innerHTML: children });
    }

    function createElement(tag, props, children) {
        elementTree = []
        const newElement = oneLineTag(tag, props, children);

        elementTree.push(newElement);

        console.log("Virtual DOM: ", elementTree)
    }

    function clearHTMLTree(root) {
        root.innerHTML = '';
    }

    return { useState, renderer, createElement }
})()

// COMPONENT
function ExampleComponent() {
    const [count, setCount] = React.useState(0);
    const [text, setText] = React.useState("Hello world");

    return {
        render: () => {
            console.log({ count, text });
            React.createElement("div", { style: "font-size: 30px; text-align: center;" }, `Count: [${count}] - Text: [${text}]`);
        },
        click: () => setCount(count + 1),
        change: () => setText("Changed text")
    }
}

// ROOT
const root = document.getElementById("root");

// INITIAL RENDER
let App = React.renderer(ExampleComponent(), root);

// MANUAL RENDERER
App.click()
App = React.renderer(ExampleComponent(), root);

App.click()
App = React.renderer(ExampleComponent(), root);

App.change()
App = React.renderer(ExampleComponent(), root);
