This section goes over the setup of the repo for development.

## Repo setup

- Install [Node.js](https://nodejs.org/) 20 LTS

- Install dependencies

```bash
npm install  --legacy-peer-deps
```

- Build the dependencies

```bash
npm run build
```

- Test the library

```bash
npm run test
```

- Watch for changes and test

In separate terminals, run:

```bash
npm run watch
```

and

```bash
npm run test:watch
```
