# Magiccraft - Web3 Wallet

## Build from source

> Requires: [`Node.js >=18.12.0`](https://nodejs.org) and [`Yarn ^1`](https://yarnpkg.com)

### Install app dependencies

```bash
yarn
```

### Build an application

```bash
# for Chrome and other Chrome-based browsers
yarn build

# for Firefox
yarn build:firefox
```

### Add an application to the browser locally

1. Open `chrome://extensions/` in your browser
2. Enable "Developer mode"
3. Tap on "Load unpacked"
4. Select `<your_local_wigwam_repository_dir>/dist/prod/chrome_unpacked`

## Useful scripts

### Test

```bash
  yarn test
```
