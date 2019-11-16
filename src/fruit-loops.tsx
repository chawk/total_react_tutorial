import * as React from 'react';

type FruitLoopsProps = {
    fruit : Array<string>
}

function FruitLoops(props : FruitLoopsProps) {
    return (
        <ul>
            {props.fruit.map((value, index) => {
                return <li key={index} style={{ color: value }}>{value}</li>
            })}
        </ul>
    )
}

FruitLoops.displayName = "FruitLoops";

export {
    FruitLoops
}