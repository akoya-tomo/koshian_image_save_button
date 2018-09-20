module.exports = {
    "env": {
        "browser": true,
        "es6": true,
        "jquery": true,
        "webextensions": true,
        "greasemonkey": true 
    },

    "parserOptions": {
        "ecmaVersion": 2016,
        "sourceType": "module"
    },

    "extends": "eslint:recommended",

    //"parser": "babel-eslint",
    /*"parserOptions": {
        "ecmaVersion": 2015,
        "sourceType": "module",
        "ecmaFeatures": {
            "experimentalObjectRestSpread": true,
            "jsx": true
        }
    },*/

    "rules": {
        "indent": ["warn", 4, {"SwitchCase": 1}],
        "linebreak-style": ["error", "unix"],
        "quotes": ["off", "double"],
        "semi": ["warn", "always"],
        "no-console": "warn",
        "no-mixed-spaces-and-tabs": "warn",
        "no-unused-vars": "warn",
    }
};