/*Webpack config*/
import '@SCSS/style'; //SCSS is defined in webpack.config.js as resolve.alias.SCSS
import times from '@LODASH/times'; //Perform function x number of times

times(10, () => console.log('whee'));
