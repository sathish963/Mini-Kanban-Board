## Installation and Run Setup

Install node js, [NodeJS](https://nodejs.org/en/download)

check node version user node -v // require 22+ to run this application

Run 'npm install' in project folder, if face any errors try 'npm install --force'

Once you successfully install packages.
then run:
  'npm run dev'

And open [http://localhost:5173/](http://localhost:5173/) given url in any Browser

## Challenges While creating board

I have facing issue with react-beautifull-dnd says that when ever I use index as draggableId which throws an error called draggable index not found.

#### Solution:
I went through on multi documentation and One of them says that we need to create our own unique id to resolve this issue and I implemented it by using Math.random() and Date.now().
