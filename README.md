## Total React Tutorial

Welcome to the Total React Tutorial using TypeScript, written by d-cipher. The purpose of this tutorial is to go over React and how to get started with it.

### Objective
Once set up, we should have a good understanding of how to use React with TypeScript. We will be able load up a webpage built using react.

### Prerequsites
For this tutorial you will need the following:
1. Node.js
```
node --version
npm --version
```
2. Visual Studios Code as the IDE
3. React Chrome Browser Extension

### Setting up project
Create our first project project in Visual Studio Code and add dependencies.
1. Init package and give it a name, description, and leave rest as default.
```
npm init
```
This creates a "package.json" file which tracks all the dependency we need for the application.
2. Add react and reactdom dependencies.
```
npm install --save react reactdom
```
Note: use ```npm uninstall <package name>``` if you want to uninstall something.
3. Set up typescript and its dependencies as developer dependencies.
```
npm install -D typescript
npm install -D @types/react @types/react-dom
npm install -D @types/node
npm install -D ts-loader
```
Set up typescript config.
```
touch tsconfig.json
```
Edit the file and add following:
```
{
    "compilerOptions" : {
        "module": "commonjs",
        "jsx": "react",
        "watch": true,
        "target": "es5",
        "lib": ["es6","dom"]
    }
}
```

### Building TypeScript File
Building our first TypeScript file and make it interact with the page.

1. Create an ```index.html``` file.
```
touch index.html
```
Add the following code to it.
```
<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8">
        <title>React Tutorial</title>
    </head>
    <body>
        <script src="./src/index.js"></script>
    </body>
</html>
```
1. Create a src directory and add an ```index.ts``` file using the following code.
```
mkdir src && cd src
echo "const my_name = 'John'; console.log('Hello ' + my_name);" > index.ts
```
2. Go to ```package.json``` and under scripts (```"scripts": {```) add the following code. This will give us and entry point to build our ts files. Typescript automatically knows to look in our src directory.
```
"build": "tsc",
```
3. Npm run the script 'build'.
```
npm run build
```
By running this script Type Script has created a ```./src/index.js``` file from our ```index.ts``` file. Notice that the compiler is running and it is watching for changes. This is because we have ```"watch": true,``` in our ```compilerOptions``` in the ```tsconfig.json``` file. This means we are watching the src file for any changes and it is going to build incrementally.
4. Open up your ```index.html``` file in your browser and you should find "Hello John" in the console logs.

### Get Webpack
Webpack allows us to compile our react files into on big bundled file because our entire react application is just one jumbled javascript file.
1. Install webpack and webpack-cli.
```
npm install -D webpack webpack-cli inline-source-map
```
2. Create a webpack config file and add configurations.
```
touch webpack.config.js
```
Add the following code to it.
```
const path = require('path');
module.exports = {
    entry: "./src/index.tsx",
    devtool: "inline-source-map",
    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname, 'dist')
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/
            }
        ]
    },
    resolve: {
        extensions: [".ts",".tsx",".js"]
    }
}
```
3. Go back to ```package.json```, under scripts (```"scripts": {```), find the build command we created earlier (```"build": "tsc",```) then change "tsc" to "webpack". We want webpack to be the one building rather than typescript.
```
"build": "webpack",
```
4. Restart a your terminal and run ```npm run build``` command again. This will allow us to set up webpack with type script in order to package react.
```
npm run build
```
5. We can also add a ```watch: true,``` to our webpack config right before the ```resolve: {``` line. This means we are watching the src file for any changes and it is going to build incrementally. Then rebuild.
```
watch: true,
```

### Build React App
Now we are ready to write react and let write our Javascript files.

1. Delete your ```index.ts``` file and your ```index.js``` file. We will create from fresh. Also, you will need to go into your ```index.html``` file and delete the script: ```<script defer src="./src/index.js"></script>```

2. Create an ```index.tsx``` in your src directory. React uses ```.jsx``` so ```.tsx``` allows type script to know that it should include react stuff.
3. Add the following code to it.
```
import * as React from 'react';
import * as ReactDOM from 'react-dom';
ReactDOM.render(
    <h1>Hello from React</h1>,
    document.querySelector('#root'))
```
4. Add the root div and the bundle script that react is going to be ancored to in your ```index.html``` in your ```<body>``` tag.
```
<div id="root"></div>
<script src="./dist/bundle.js"></script>
```
5. Save and load up your index.html file in your browser and you should see your "Hello from React" webpage.

### Working with Components
React apps are just built out of many components. The reason why is you get to use these components over and over again.

1. To create a component, create a tsx file in your src directory. We will call it  ```content.tsx```.
```
cd src
touch content.tsx
```
Add the following code.
```
import * as React from 'react';
const Content = (): JSX.Element => {
    return (
        <div>
        <p>This is a paragraph</p>
        </div>
    )
}
Content.displayName = 'Content';
export default Content;
```
2. Import the component into our ```index.tsx``` and add it to the DOM.
```
import Content from './content';
```
Add ```<Content />``` to the div in our DOM like so:
```
<div>
    <h1>Hello from React</h1>
    <Content />
</div>
```

### Working with Props
Props are a way to pass data from to parent to your component. Use props for data that does not change often. Use state for dynamic data that changes all the time.

1. In ```content.tsx``` change the Content function to the following.
```
import * as React from 'react';
type ContentProps = {
    text: string
}
const Content = (props: ContentProps): JSX.Element => {
    return (
        <div>
        <p>{props.text}</p>
        </div>
    )
}
Content.displayName = 'Content';
export default Content;
```
Note that the ```type``` uses type script to enforce the type of the input into props to string. You can use ```text?: string``` if the input is optional.

2. Create an attribute in that corresponds to the props that gets passed in from the HTML. Add the attribute ```text``` to your ```<Content />``` tag.
```
<Content text="Good Luck in class!" />
```

### Working with CSS
When styling you will want to create a css stylesheet and pass in the classes into your component.

1. Create a public directory and add a ```main.css``` stylesheet. Add the following code to it.
```
.primary-header {
    color: #62a3e5;
    font-size: 24px;
}
```
2. Add stylesheet link tag to the ```index.html``` right above the closing ```</head>``` tag.
```
<link rel="stylesheet" href="./public/main.css" />
```
3. Create a new component called ```header.tsx```.
```
import * as React from 'react';
type HeaderProps = {
    text: string
}
const Header = (props: HeaderProps): JSX.Element => {
    return (
        <h1 className="primary-header">{props.text}</h1>
    )
}
Header.displayName = 'Header';
export default Header;
```
Once created, import it to your ```index.tsx```, ```import Header from './header';```. Replace your header tag in the file with your new component ```<Header text="Hello from React" />```.
3. Load your page and you should see your newly styled header.

### Working with State
State lets React know to re-render itself when there is a change. State can be implemented through React Hooks.

1. Create a ```custom-date.tsx``` file in src and add the following code.
```
import * as React from 'react'
const CustomDate = (): JSX.Element => {
    let [date, setDate] = React.useState('')

    let getDate = () => {
        setDate(new Date().toDateString());
    }
    return (
        <div>
            {date}
            <br />
            <button onClick={getDate}>Get Date</button>
        </div>
    )
}
CustomDate.displayName = 'CustomDate';
export default CustomDate;
```
The ```let [date, setDate] = React.useState('')``` allows us to use state by setting calling the function setDate, replacing it with our new value, and assigning it to onClick we can dynamically render the page on click.

2. Import ```CustomDate``` into ```index.tsx```, add it to the Dom, and reload the page and you should be able to get date with your button.

### Working with Lists
Working with lists involves using the map function to map your lists and return it into your ```<li>``` tag.

1. Create a ```todo-list.tsx``` file in src and add the following code.
```
import * as React from 'react';
type ToDoListProps = {
    items : string[]
}
const ToDoList = (props: ToDoListProps): JSX.Element => {

    return (
    <ul>
        {props.items.map((value,index) => {
            return <li key={index}> {value} </li>
        })}
    </ul>
    )
}
ToDoList.displayName = 'ToDoList';
export default ToDoList;
```

2. Import ```ToDoList``` into ```index.tsx```, add it to the Dom. Note that in order to add to the DOM you will also need to pass the list into props. To do this add an items list to your ```index.tsx``` and add that to your ```ToDoList``` element. The result should look like this:
```
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Header from './header';
import Content from './content';
import CustomDate from './custom-date';
import ToDoList from './todo-list';
let items : string[] = ["eggs", "milk", "chicken", "salad"];
ReactDOM.render(
    <div>
        <Header text="Hello from React" />
        <Content text="Good Luck in class!" />
        <CustomDate />
        <ToDoList items={items} />
    </div>,
    document.querySelector('#root')
)
```
