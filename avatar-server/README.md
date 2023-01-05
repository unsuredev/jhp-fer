# API template.

## Features

- Live Reload
- Typescript 4.3+
- ESLint
- Mongoose
- Restify
- Swagger Starter included
- Code split into their own files for routes, logging included.
- ES6+

## To begin development, you need

- node 14+
- `npm` (comes with node) or `yarn`

## Downloading dependencies

- do `npm i` (or) `yarn` in the current directory

## Beginning Development

The project uses `typescript` coupled with `nodemon` therefore any changes to the code will restart the node process

```
// npm users
npm run dev

// yarn users
yarn dev
```

## For production build

```
npm run build // yarn build
```

## For swagger docs

```
npm run swagger // yarn swagger
```

## For config

check the `.env` for environmental variables.

check the `log4js.json` for log config.

check the `swagger` directory for swagger documentation.

check the `tsconfig.json` for typescript config.

check the `.eslintrc` for linter config.

### Recommended editor

`vscode`
https://code.visualstudio.com/
