StarrySky.DefaultData.fileNames = {
  moonDiffuseMap: 'lunar-diffuse-map.webp',
  moonNormalMap: 'lunar-normal-map.webp',
  moonRoughnessMap: 'lunar-roughness-map.webp',
  moonApertureSizeMap: 'lunar-aperture-size-map.webp',
  moonApertureOrientationMap: 'lunar-aperture-orientation-map.webp',
  starHashCubemap: [
    'star-dictionary-cubemap-px.png',
    'star-dictionary-cubemap-nx.png',
    'star-dictionary-cubemap-py.png',
    'star-dictionary-cubemap-ny.png',
    'star-dictionary-cubemap-pz.png',
    'star-dictionary-cubemap-nz.png',
  ],
  dimStarDataMaps: [
    'dim-star-data-r-channel.png',
    'dim-star-data-g-channel.png',
    'dim-star-data-b-channel.png',
    'dim-star-data-a-channel.png'
  ],
  medStarDataMaps: [
    'med-star-data-r-channel.png',
    'med-star-data-g-channel.png',
    'med-star-data-b-channel.png',
    'med-star-data-a-channel.png'
  ],
  brightStarDataMaps:[
    'bright-star-data-r-channel.png', //We choose to use PNG for the bright star data as webp is actually twice as big
    'bright-star-data-g-channel.png',
    'bright-star-data-b-channel.png',
    'bright-star-data-a-channel.png'
  ],
  starColorMap: 'star-color-map.png',
  blueNoiseMaps:[
    'blue-noise-0.bmp',
    'blue-noise-1.bmp',
    'blue-noise-2.bmp',
    'blue-noise-3.bmp',
    'blue-noise-4.bmp'
  ],
  solarEclipseMap: 'solar-eclipse-map.webp'
};

StarrySky.DefaultData.assetPaths = {
  moonDiffuseMap: './assets/moon/' + StarrySky.DefaultData.fileNames.moonDiffuseMap,
  moonNormalMap: './assets/moon/' + StarrySky.DefaultData.fileNames.moonNormalMap,
  moonRoughnessMap: './assets/moon/' + StarrySky.DefaultData.fileNames.moonRoughnessMap,
  moonApertureSizeMap: './assets/moon/' + StarrySky.DefaultData.fileNames.moonApertureSizeMap,
  moonApertureOrientationMap: './assets/moon/' + StarrySky.DefaultData.fileNames.moonApertureOrientationMap,
  solarEclipseMap: './assets/solar_eclipse/' + StarrySky.DefaultData.fileNames.solarEclipseMap,
  starHashCubemap: StarrySky.DefaultData.fileNames.starHashCubemap.map(x => './assets/star_data/' + x),
  dimStarDataMaps: StarrySky.DefaultData.fileNames.dimStarDataMaps.map(x => './assets/star_data/' + x),
  medStarDataMaps: StarrySky.DefaultData.fileNames.medStarDataMaps.map(x => './assets/star_data/' + x),
  brightStarDataMaps: StarrySky.DefaultData.fileNames.brightStarDataMaps.map(x => './assets/star_data/' + x),
  starColorMap: './assets/star_data/' + StarrySky.DefaultData.fileNames.starColorMap,
  blueNoiseMaps: StarrySky.DefaultData.fileNames.blueNoiseMaps.map(x => './assets/blue_noise/' + x)
};

//Clone the above, in the event that any paths are found to differ, we will
//replace them.
StarrySky.assetPaths = JSON.parse(JSON.stringify(StarrySky.DefaultData.assetPaths));

//Parent class
const SkyAssetsDir = function(values){
  //Check if there are any child elements. Otherwise set them to the default.
  this.skyDataLoaded = false;
  this.data = StarrySky.DefaultData.assetPaths;
  this.isRoot = false;

  const self = this;
  function stripStartingAndTrailingSlashes(path, filename){
    filename = filename.startsWith('/') ? path.slice(1, path.length - 1) : path;
    filename = filename.endsWith('/') ? path.slice(0, path.length - 2) : path;
    path = path.endsWith('/') ? path : path + '/';
    return path + filename;
  }
  this.explore = function(values, pwd_in){
    searchDepth++;
    if(searchDepth > 99){
      console.error("Why do you need a hundred of these?! You should be able to use like... 2. Maybe 3? I'm breaking to avoid freezing your machine.");
      return false; //Oh, no, you don't just get to break, we're shutting down the entire function
    }

    let pwd = pwd_in;
    if(values.hasOwnProperty('directory')){
      const pwd = stripStartingAndTrailingSlashes(pwd_in, values.directory) + '/';
    }

    const newData = {
      moonDiffuseMap: values.hasOwnProperty('moon_diffuse_map') ? stripStartingAndTrailingSlashes(pwd, values.moon_diffuse_map) : self.data.moonDiffuseMap,
      moonNormalMap: values.hasOwnProperty('moon_normal_map') ? stripStartingAndTrailingSlashes(pwd, values.moon_normal_map) : self.data.moonNormalMap,
      moonRoughnessMap: values.hasOwnProperty('moon_roughness_map') ? stripStartingAndTrailingSlashes(pwd, values.moon_roughness_map) : self.data.moonRoughnessMap,
      moonApertureSizeMap: values.hasOwnProperty('moon_aperture_size_map') ? stripStartingAndTrailingSlashes(pwd, values.moon_aperture_size_map) : self.data.moonApertureSizeMap,
      moonApertureOrientationMap: values.hasOwnProperty('moon_aperture_orientation_map') ? stripStartingAndTrailingSlashes(pwd, values.moon_aperture_orientation_map) : self.data.moonApertureOrientationMap,
      starColorMap: values.hasOwnProperty('star_color_map') ? stripStartingAndTrailingSlashes(pwd, values.star_color_map) : self.data.starColorMap,
      solarEclipseMap: values.hasOwnProperty('solar_eclipse_map') ? stripStartingAndTrailingSlashes(pwd, values.solar_eclipse_map) : self.data.solarEclipseMap,
      starHashCubemap: self.data.starHashCubemap,
      dimStarDataMaps: self.data.dimStarDataMaps,
      medStarDataMaps: self.data.medStarDataMaps,
      brightStarDataMaps: self.data.brightStarDataMaps,
      blueNoiseMaps: self.data.blueNoiseMaps
    };

    if(values.hasOwnProperty('star_hash_cubemap')){
      let pwd_2 = pwd;
      if(values.star_hash_cubemap.hasOwnProperty('directory')){
        pwd_2 = stripStartingAndTrailingSlashes(pwd_2, values.star_hash_cubemap.directory) + '/';
      }
      foreach(StarrySky.DefaultData.fileNames.starHashCubemap as starHashCubemapFile){
        newData.starHashCubemap.push(stripStartingAndTrailingSlashes(pwd_2, starHashCubemapFile));
      }
    }
    if(values.hasOwnProperty('dim_star_datamap')){
      let pwd_2 = pwd;
      if(values.star_hash_cubemap.hasOwnProperty('directory')){
        pwd_2 = stripStartingAndTrailingSlashes(pwd_2, values.dim_star_datamap.directory) + '/';
      }
      foreach(StarrySky.DefaultData.fileNames.dimStarDataMaps as dimStartDataMap){
        newData.dimStarDataMaps.push(stripStartingAndTrailingSlashes(pwd_2, dimStartDataMap));
      }
    }
    if(values.hasOwnProperty('med_star_datamap')){
      let pwd_2 = pwd;
      if(values.star_hash_cubemap.hasOwnProperty('directory')){
        pwd_2 = stripStartingAndTrailingSlashes(pwd_2, values.med_star_datamap.directory) + '/';
      }
      foreach(StarrySky.DefaultData.fileNames.medStarDataMaps as medStarDataMap){
        newData.medStarDataMaps.push(stripStartingAndTrailingSlashes(pwd_2, medStarDataMap));
      }
    }
    if(values.hasOwnProperty('bright_star_datamap')){
      let pwd_2 = pwd;
      if(values.star_hash_cubemap.hasOwnProperty('directory')){
        pwd_2 = stripStartingAndTrailingSlashes(pwd_2, values.bright_star_datamap.directory) + '/';
      }
      foreach(StarrySky.DefaultData.fileNames.brightStarDataMaps as brightStarDataMap){
        newData.brightStarDataMaps.push(stripStartingAndTrailingSlashes(pwd_2, brightStarDataMap));
      }
    }
    if(values.hasOwnProperty('blue_noise_maps')){
      let pwd_2 = pwd;
      if(values.blue_noise_maps.hasOwnProperty('directory')){
        pwd_2 = stripStartingAndTrailingSlashes(pwd_2, values.blue_noise_maps.directory) + '/';
      }
      foreach(StarrySky.DefaultData.fileNames.blueNoiseMaps as blueNoiseMap){
        newData.blueNoiseMaps.push(stripStartingAndTrailingSlashes(pwd_2, blueNoiseMap));
      }
    }
    self.data = newData;

    const properties = Object.keys(values);
    for(const i = 0, numProperties = properties.length; i < numProperties; ++i){
      const property = properties[i];
      if(property.endsWith('_directory')){
        const subDirectoryValues = values.property;
        this.explore(subDirectoryValues, pwd);
      }
    }
  };
  this.init = function(values){
    let pwd = values.hasOwnProperty('directory') ? values.directory : '/';
    let searchDepth = 0;
    self.data = {
      moonDiffuseMap: values.hasOwnProperty('moon_diffuse_map') ? stripStartingAndTrailingSlashes(pwd, values.moon_diffuse_map) : StarrySky.DefaultData.assetPaths.moonDiffuseMap,
      moonNormalMap: values.hasOwnProperty('moon_normal_map') ? stripStartingAndTrailingSlashes(pwd, values.moon_normal_map) : StarrySky.DefaultData.assetPaths.moonNormalMap,
      moonRoughnessMap: values.hasOwnProperty('moon_roughness_map') ? stripStartingAndTrailingSlashes(pwd, values.moon_roughness_map) : StarrySky.DefaultData.assetPaths.moonRoughnessMap,
      moonApertureSizeMap: values.hasOwnProperty('moon_aperture_size_map') ? stripStartingAndTrailingSlashes(pwd, values.moon_aperture_size_map) : StarrySky.DefaultData.assetPaths.moonApertureSizeMap,
      moonApertureOrientationMap: values.hasOwnProperty('moon_aperture_orientation_map') ? stripStartingAndTrailingSlashes(pwd, values.moon_aperture_orientation_map) : StarrySky.DefaultData.assetPaths.moonApertureOrientationMap,
      starColorMap: values.hasOwnProperty('star_color_map') ? stripStartingAndTrailingSlashes(pwd, values.star_color_map) : StarrySky.DefaultData.assetPaths.starColorMap,
      solarEclipseMap: values.hasOwnProperty('solar_eclipse_map') ? stripStartingAndTrailingSlashes(pwd, values.solar_eclipse_map) : StarrySky.DefaultData.assetPaths.solarEclipseMap,
      starHashCubemap: [],
      dimStarDataMaps: [],
      medStarDataMaps: [],
      brightStarDataMaps: [],
      blueNoiseMaps: []
    };

    if(values.hasOwnProperty('star_hash_cubemap')){
      let pwd_2 = pwd;
      if(values.star_hash_cubemap.hasOwnProperty('directory')){
        pwd_2 = stripStartingAndTrailingSlashes(pwd_2, values.star_hash_cubemap.directory) + '/';
      }
      foreach(StarrySky.DefaultData.fileNames.starHashCubemap as starHashCubemapFile){
        self.data.starHashCubemap.push(stripStartingAndTrailingSlashes(pwd_2, starHashCubemapFile));
      }
    }
    if(values.hasOwnProperty('dim_star_datamap')){
      let pwd_2 = pwd;
      if(values.star_hash_cubemap.hasOwnProperty('directory')){
        pwd_2 = stripStartingAndTrailingSlashes(pwd_2, values.dim_star_datamap.directory) + '/';
      }
      foreach(StarrySky.DefaultData.fileNames.dimStarDataMaps as dimStartDataMap){
        self.data.dimStarDataMaps.push(stripStartingAndTrailingSlashes(pwd_2, dimStartDataMap));
      }
    }
    if(values.hasOwnProperty('med_star_datamap')){
      let pwd_2 = pwd;
      if(values.star_hash_cubemap.hasOwnProperty('directory')){
        pwd_2 = stripStartingAndTrailingSlashes(pwd_2, values.med_star_datamap.directory) + '/';
      }
      foreach(StarrySky.DefaultData.fileNames.medStarDataMaps as medStarDataMap){
        self.data.medStarDataMaps.push(stripStartingAndTrailingSlashes(pwd_2, medStarDataMap));
      }
    }
    if(values.hasOwnProperty('bright_star_datamap')){
      let pwd_2 = pwd;
      if(values.star_hash_cubemap.hasOwnProperty('directory')){
        pwd_2 = stripStartingAndTrailingSlashes(pwd_2, values.bright_star_datamap.directory) + '/';
      }
      foreach(StarrySky.DefaultData.fileNames.brightStarDataMaps as brightStarDataMap){
        self.data.brightStarDataMaps.push(stripStartingAndTrailingSlashes(pwd_2, brightStarDataMap));
      }
    }
    if(values.hasOwnProperty('blue_noise_maps')){
      let pwd_2 = pwd;
      if(values.blue_noise_maps.hasOwnProperty('directory')){
        pwd_2 = stripStartingAndTrailingSlashes(pwd_2, values.blue_noise_maps.directory) + '/';
      }
      foreach(StarrySky.DefaultData.fileNames.blueNoiseMaps as blueNoiseMap){
        self.data.blueNoiseMaps.push(stripStartingAndTrailingSlashes(pwd_2, blueNoiseMap));
      }
    }

    const properties = Object.keys(values);
    for(const i = 0, numProperties = properties.length; i < numProperties; ++i){
      const property = properties[i];
      if(property.endsWith('_directory')){
        const subDirectoryValues = values.property;
        explore(subDirectoryValues, pwd);
      }
    }
  };
}
