var moment = require('moment');
// January 1st 1970 00:00:00 (gmt)

// new Date().getTime();
// var date = new Date();
// console.log(date.getMo  nth());

var date = moment();
console.log(date.format('MMM Do, YYYY'));

date.add(100, 'year');
console.log(date.format('MMM Do, YYYY'));

date.add(100, 'years').subtract(9, 'months');
console.log(date.format('MMM Do, YYYY'));

// 10:35 am, padded for minutes, unpadded for hours, 12 hour clock
var davidDate = moment();
console.log(davidDate.format('h:mm a'));

// passing to moment a different point in timeout


var createdAt = 61234;
var date = moment(createdAt);
var origDate = moment(0);
console.log('createdAt', date.format('h:mm a'));
console.log('origDate', origDate.format('h:mm a'));

// the unix timestamp using new Date().getTime is the equivalent of moment().valueOf()
var someTimestamp = moment().valueOf();
console.log(someTimestamp);
