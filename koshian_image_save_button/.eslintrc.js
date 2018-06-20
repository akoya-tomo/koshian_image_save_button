module.exports = {
    "env": {
        "browser": true,
        "jquery": true,
        "webextensions": true,
        "greasemonkey": true 
    },
    "extends": "eslint:recommended",
    "parser": "babel-eslint",
    "parserOptions": {
        "ecmaVersion": 6,
        "sourceType": "module",
        "ecmaFeatures": {
            "experimentalObjectRestSpread": true,
            "jsx": true
        }
    },
    "rules": {
        //"indent": [
        //    "error",
        //    4
        //],
        "linebreak-style": [
            "error",
            "unix"
        ],
        "quotes": [
            "warn",
            "double"
        ],
        "semi": [
            "error",
            "always"
        ],
        "no-console": 1,
        "no-mixed-spaces-and-tabs": 1,
    }
};