import { DateRangePicker } from 'tiny-date-picker/dist/date-range-picker';
DateRangePicker(document.querySelector('.container'));

// Initialize a date picker in the specified container
const dp = DateRangePicker('.container');

// Get the start date (can be null)
dp.state.start;

// Get the end date (can be null)
dp.state.end;

// Add an event handler
dp.on('statechange', (_, picker) => console.log(picker.state));

// Remove all event handlers (see the Events section for more information)
dp.off();

// Update the date picker's state and redraw as necessary.
// This example causes the date picker to select the specified start date
// and end date.
dp.setState({
  start: new Date('10/12/2017'),
  start: new Date('10/14/2017')
});
