StarrySky.DefaultData.skyAtmosphericParameters = {
  solarIntensity: 1367.0,
  lunarMaxIntensity: 29,
  solarColor: {
    red: 6.5E-7,
    green: 5.1E-7,
    blue: 4.75E-7
  },
  lunarColor: {
    red: 6.5E-7,
    green: 5.1E-7,
    blue: 4.75E-7
  },
  mieBeta: {
    red: 2E-6,
    green: 2E-6,
    blue: 2E-6
  },
  mieDirectionalG: 0.8,
  numberOfRaySteps: 30,
  numberOfGatheringSteps: 30,
  ozoneEnabled: true,
  sunAngularDiameter: 3.38,
  moonAngularDiameter: 3.15,
};

//Parent tag
const SkyAtmosphericParameters = function(values){
  //Check if there are any child elements. Otherwise set them to the default.
  this.skyDataLoaded = false;
  this.data = StarrySky.DefaultData.skyAtmosphericParameters;

  const self = this;
  this.init = function(values){
    //Set the params to appropriate values or default
    self.data.mieDirectionalG = values.hasOwnProperty('mie_directional_g') ? Number(values.mie_directional_g) : self.data.mieDirectionalG;
    self.data.sunAngularDiameter = values.hasOwnProperty('sun_angular_diameter') ? Number(values.sun_angular_diameter) : self.data.sunAngularDiameter;
    self.data.moonAngularDiameter = values.hasOwnProperty('moon_angular_diameter') ? Number(values.moon_angular_diameter) : self.data.moonAngularDiameter;

    //Clamp our results to the appropriate ranges
    const clampAndWarn = function(inValue, minValue, maxValue, jsonParameter){
      let result = Math.min(Math.max(inValue, minValue), maxValue);
      if(inValue > maxValue){
        console.warn(`The ${jsonParameter} parameter in the atmospheric_parameters object, with a value of ${inValue} is outside of it's range and was clamped. It has a max value of ${maxValue} and a minimum value of ${minValue}.`);
      }
      else if(inValue < minValue){
        console.warn(`The ${jsonParameter} parameter in the atmospheric_parameters object, with a value of ${inValue} is outside of it's range and was clamped. It has a minmum value of ${minValue} and a minimum value of ${minValue}.`);
      }
      return result;
    };

    self.data.mieDirectionalG = clampAndWarn(self.data.mieDirectionalG, -1.0, 1.0, 'mie_directional_g');
    self.data.sunAngularDiameter = clampAndWarn(self.data.sunAngularDiameter, 0.1, 90.0, 'sun_angular_diameter');
    self.data.moonAngularDiameter = clampAndWarn(self.data.moonAngularDiameter, 0.1, 90.0, 'moon_angular_diameter');

    self.skyDataLoaded = true;
    document.dispatchEvent(new Event('Sky-Data-Loaded'));
  };
}
