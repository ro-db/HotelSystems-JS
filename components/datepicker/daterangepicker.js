console.log('RECIEVED');

var didClickIt = false;
document.getElementById('submit').addEventListener('click', function() {
  // same as onclick, keeps the JS and HTML separate
  didClickIt = true;
});

setInterval(function() {
  // this is the closest you get to an infinite loop in JavaScript
  if (didClickIt) {
    didClickIt = false;
    // document.write causes silly problems, do this instead (or better yet, use a library like jQuery to do this stuff for you)
    var start = document.getElementById('startdate').value;
    var end = document.getElementById('enddate').value;

    console.log(start);
    console.log(end);

    window.alert('start: ' + start + '\nend: ' + end);
  }
}, 500);
