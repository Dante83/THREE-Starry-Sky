StarrySky.DefaultData.time;
(function setupAStarrySkyDefaultTimeData(){
  //Using https://stackoverflow.com/questions/10632346/how-to-format-a-date-in-mm-dd-yyyy-hhmmss-format-in-javascript
  const now = new Date();
  StarrySky.DefaultData.time = {
    date: [now.getMonth()+1,
               now.getDate(),
               now.getFullYear()].join('/')+' '+
              [now.getHours(),
               now.getMinutes(),
               now.getSeconds()].join(':'),
    utcOffset: 7,
    speed: 1.0
  };
})();

//Parent tag
const StarryKey.SkyTime = function(){
  this.userDefinedTime = userDefinedTime;
  this.skyDataLoaded = false;
  this.data = StarrySky.DefaultData.time;

  const self = this;
  this.init = function(values){
    //Set the params to appropriate values or default
    self.data.date = values.hasOwnProperty('date') ? values.date : self.data.date;
    self.data.utcOffset = values.hasOwnProperty('utc_offset') ? -Number(values.date.utc_offset) : self.data.utcOffset;
    self.data.speed = values.hasOwnProperty('speed') ? Number(values.speed) : self.data.speed;

    const clampAndWarn = function(inValue, minValue, maxValue, jsonParameter){
      let result = Math.min(Math.max(inValue, minValue), maxValue);
      if(inValue > maxValue){
        console.warn(`The ${jsonParameter} parameter in the time object, with a value of ${inValue} is outside of it's range and was clamped. It has a max value of ${maxValue} and a minimum value of ${minValue}.`);
      }
      else if(inValue < minValue){
        console.warn(`The ${jsonParameter} parameter in the time object, with a value of ${inValue} is outside of it's range and was clamped. It has a minmum value of ${minValue} and a minimum value of ${minValue}.`);
      }
      return result;
    };

    //By some horrible situation. The maximum and minimum offset for UTC timze is 26 hours apart.
    self.data.utcOffset = self.data.utcOffset ? clampAndWarn(self.data.utcOffset, -14.0, 12.0, 'utc_offset') : null;
    self.data.speed = self.data.speed ? clampAndWarn(self.data.speed, 0.0, 1000.0, 'speed') :null;
    self.skyDataLoaded = true;
    document.dispatchEvent(new Event('Sky-Data-Loaded'));
  };
}
