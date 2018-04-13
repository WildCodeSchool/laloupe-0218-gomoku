// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: 'AIzaSyBPcNBKJr3PtrgE92Txxe3woaEc75CpsNI',
    authDomain: 'gomoku-projet-2.firebaseapp.com',
    databaseURL: 'https://gomoku-projet-2.firebaseio.com',
    projectId: 'gomoku-projet-2',
    storageBucket: 'gomoku-projet-2.appspot.com',
    messagingSenderId: '1001534234475',
  },
};

