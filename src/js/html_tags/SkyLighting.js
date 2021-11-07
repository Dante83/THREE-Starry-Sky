StarrySky.DefaultData.lighting = {
  groundColor: {
    red: 66,
    green: 44,
    blue: 2
  },
  atmosphericPerspectiveEnabled: true,
  atmosphericPerspectiveDensity: 0.007,
  shadowCameraSize: 32.0,
  shadowCameraResolution: 2048
};

//Parent tag
const StarryKey.SkyLighting = function(values){
  //Check if there are any child elements. Otherwise set them to the default.
  this.skyDataLoaded = false;
  this.data = StarrySky.DefaultData.lighting;

  const self = this;
  this.init = function(values){
    //Parse the values in our tags
    self.data.atmosphericPerspectiveDensity = values.hasOwnProperty('atmospheric_perspective_density') ? Number(values.atmospheric_perspective_density) : self.data.atmosphericPerspectiveDensity;
    self.data.atmosphericPerspectiveEnabled = self.data.atmosphericPerspectiveDensity > 0.0;
    self.data.shadowCameraSize = values.hasOwnProperty('shadow_camera_size') ? Number(values.shadow_camera_size) : self.data.shadowCameraSize;
    self.data.shadowCameraResolution = values.hasOwnProperty('shadow_camera_resolution') ? Number(values.shadow_camera_resolution) : self.data.shadowCameraResolution;

    //Clamp our results to the appropriate ranges
    const clampAndWarn = function(inValue, minValue, maxValue, jsonParameter){
      let result = Math.min(Math.max(inValue, minValue), maxValue);
      if(inValue > maxValue){
        console.warn(`The ${jsonParameter} parameter in the lighting object, with a value of ${inValue} is outside of it's range and was clamped. It has a max value of ${maxValue} and a minimum value of ${minValue}.`);
      }
      else if(inValue < minValue){
        console.warn(`The ${jsonParameter} parameter in the lighting object, with a value of ${inValue} is outside of it's range and was clamped. It has a minmum value of ${minValue} and a minimum value of ${minValue}.`);
      }
      return result;
    };

    //Clamp the values in our tags
    self.data.atmosphericPerspectiveDensity = clampAndWarn(self.data.atmosphericPerspectiveDensity, 0.0, Infinity, 'atmospheric_perspective_density');
    self.data.shadowCameraSize = clampAndWarn(self.data.shadowCameraSize, 0.0, Infinity, 'shadow_camera_size');
    self.data.shadowCameraResolution = clampAndWarn(self.data.shadowCameraResolution, 32, 15360, 'shadow_camera_resolution');

    //Parse our ground color
    if(values.hasOwnProperty('ground_color')){
      const groundColor = values.ground_color;
      self.data.groundColor.red = clampAndWarn(groundColor.red, 0, 255, 'ground_color.red');
      self.data.groundColor.green = clampAndWarn(groundColor.green, 0, 255, 'ground_color.green');
      self.data.groundColor.blue = clampAndWarn(groundColor.blue, 0, 255, 'ground_color.blue');
    }

    self.skyDataLoaded = true;
    document.dispatchEvent(new Event('Sky-Data-Loaded'));
  };
}
