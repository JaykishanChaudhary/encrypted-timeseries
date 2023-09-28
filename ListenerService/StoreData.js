const TimeseriesModel = require('./Model/DataModel');
const moment=require('moment');
const currentMinuteStart = moment().startOf('minute');

async function saveObjectInDb(dataObj) {
    // Parse the input string as JSON
    const inputData = JSON.parse(dataObj);
    try {
        const result = await TimeseriesModel.DataModel.updateOne(
            { timestamp: {
                $gte: currentMinuteStart.toDate(), // Convert moment object to Date
                $lt: moment(currentMinuteStart).add(1, 'minutes').toDate() // Add 1 minute to get the end of the minute
              }
            },
            { $push: { Data: inputData } },
            { upsert: true } // Create if not exists
        );
        console.log('Data saved to timeseries for', currentMinuteStart, result);
    } catch (error) {
        console.error('Error saving data:', error);
    }
}


module.exports=saveObjectInDb