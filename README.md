## Installation and Run Setup

Install node js, [NodeJS](https://nodejs.org/en/download)

check node version using 

```js
  node -v // require 22+ to run this application
```

Run 'npm install' in project folder, if face any errors try 'npm install --force'
```js
  npm install 
  // (or)
  npm install --force
```

Once you successfully install packages.
then run:
```js
  npm run dev
```

And open [http://localhost:5173/](http://localhost:5173/) given url in any Browser

# Features
* Impletate Drag and Drop to handle Task status.
* Create re-usable Components.
* Implemented Progress bar to indicate task completion ratio.
* Added Quick Filter for priority basis.
* Implemented Search filter.
* Edit and Delete functionality for tasks.
* Create theme switching functionality.

## Challenges While creating board

I have facing issue with react-beautifull-dnd says that when ever I use index as draggableId which throws an error called draggable index not found.

#### Solution:
I went through on multi documentation and One of them says that we need to create our own unique id to resolve this issue and I implemented it by using Math.random() and Date.now().
