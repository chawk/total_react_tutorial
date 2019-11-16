import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Header } from './header';
import { CustomDate } from './custom-date';
import { FruitLoops } from './fruit-loops';

let fruit : Array<string> = [
    "red",
    "green",
    "blue",
    "yellow",
    "pink",
    "brown"
]

ReactDOM.render(
    <div>
        <Header text="satisfied" />
        <CustomDate />
        <FruitLoops fruit={fruit} />
        <p>this is a paragraph</p>
        <a href="#">Click me</a>
    </div>,
    document.querySelector('#root')
)

