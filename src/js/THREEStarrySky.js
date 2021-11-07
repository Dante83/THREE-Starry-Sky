StarrySky.Sky = function(webWorkerSRC, data){
  this.data = data;
  this.webWorkerSRC = webWorkerSRC;
  this.defaultValues = StarrySky.DefaultData,
  this.skyDirector = null;
  this.initialized = false;

  //Set up our values
  this.skyTime = new StarrySky.SkyTime();
  this.skyTime.init(data.hasOwnProperty('time') ? data.time : {});
  this.skyLocation = new StarrySky.SkyLocation();
  this.skyLocation.init(data.hasOwnProperty('location') ? data.location : {});
  this.skyLighting = new StarrySky.SkyLighting();
  this.skyLighting.init(data.hasOwnProperty('lighting') ? data.lighting : {});
  this.skyAtmosphericParameters = new StarrySky.SkyAtmosphericParameters();
  this.skyAtmosphericParameters.init(data.hasOwnProperty('atmospheric_parameters') ? data.atmospheric_parameters : {});
  this.skyAssetsDir = new StarrySky.SkyAssetsDir();
  this.skyAssetsDir.init(data.hasOwnProperty('sky_assets') ? data.sky_assets : {});

  //Initialize our application
  this.skyDirector = new StarrySky.SkyDirector(this, this.webWorkerSRC);
  this.tick = function(time, timeDelta){
    /*Do Nothing*/
  };
}
