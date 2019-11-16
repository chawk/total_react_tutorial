import * as React from 'react';

type HeaderProps = {
    text: string
}

function Header(props : HeaderProps) {
    React.useEffect(() => {
        alert(document.querySelector('#myHeader'));
    })
    
    return (
        <h1 id="myHeader" className="primary-header">{props.text}</h1>
    )
}

Header.displayName = "Header";

export {
    Header
}