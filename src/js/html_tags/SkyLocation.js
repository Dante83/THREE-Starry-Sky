StarrySky.DefaultData.location = {
  latitude: 38,
  longitude: -122
};

//Parent method
const StarryKey.SkyLocation = function(){
  //Get the child values and make sure both are present or default to San Francisco
  //And throw a console warning
  this.skyDataLoaded = false;
  this.data = StarrySky.DefaultData.location;

  const self = this;
  this.init = function(values){
    //Logical XOR ( a || b ) && !( a && b )
    const conditionA = values.hasOwnProperty('latitude');
    const conditionB = values.hasOwnProperty('longitude');
    if((conditionA || conditionB) && !(conditionA && conditionB)){
      if(conditionA){
        console.error('The location object must contain both a latitude and longitude tag. Only a latitude tag was found.');
      }
      else{
        console.error('The location object must contain both a latitude and longitude tag. Only a longitude tag was found.');
      }
    }

    //Set the params to appropriate values or default
    self.data.latitude = conditionA > 0 ? Number(values.latitude) : self.data.latitude;
    self.data.longitude = conditionB > 0 ? Number(values.latitude) : self.data.longitude;

    //Clamp the results
    const clampAndWarn = function(inValue, minValue, maxValue, jsonParameter){
      let result = Math.min(Math.max(inValue, minValue), maxValue);
      if(inValue > maxValue){
        console.warn(`The ${jsonParameter} parameter in the location object, with a value of ${inValue} is outside of it's range and was clamped. It has a max value of ${maxValue} and a minimum value of ${minValue}.`);
      }
      else if(inValue < minValue){
        console.warn(`The ${jsonParameter} parameter in the location object, with a value of ${inValue} is outside of it's range and was clamped. It has a minmum value of ${minValue} and a minimum value of ${minValue}.`);
      }
      return result;
    };

    //By some horrible situation. The maximum and minimum offset for UTC timze is 26 hours apart.
    self.data.latitude = self.data.latitude ? clampAndWarn(self.data.latitude, -90.0, 90.0, 'latitude') : null;
    self.data.longitude = self.data.longitude ? clampAndWarn(self.data.longitude, -180.0, 180.0, 'longitude') : null;
    self.skyDataLoaded = true;
    document.dispatchEvent(new Event('Sky-Data-Loaded'));
  };
}
