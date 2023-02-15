const playerInstance = jwplayer("player").setup({
  controls: true,
  sharing: true,
  displaytitle: true,
  displaydescription: true,
  fullscreen: "true",
  primary: "html5",
  stretching: "uniform",
  aspectratio: "16:9",
  renderCaptionsNatively: false,
  autostart: false,
  abouttext: "Github",
  aboutlink: "https://github.com/Foilz",

  skin: {
    name: "netflix"
  },

  logo: {
    file:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/799px-Netflix_2015_logo.svg.png"
  },

  advertising: {
    client: "vast",
    schedule: [
      {
        offset: "pre",
        tag: "https://syndication.exdynsrv.com/splash.php?idzone=4648050"
      }
    ],
    rules: {
      startOn: 1,
      frequency: 5
    }
  },

  captions: {
    color: "#FFF",
    fontSize: 14,
    backgroundOpacity: 0,
    edgeStyle: "raised"
  },

  playlist: [
    {
      title: "Adele OH My God",
      description: "You're Watching",
     image: "wp4501514-the-irishman-wallpapers.jpg",
      sources: [
        {
          file:
            "https://drive.google.com/file/d/1aozmcDnS9gCyUe8ySiyHvYqTIl-fcFeC/view?usp=sharing",
          label: "1080p",
          default: true
        },
        {
          file:
            "https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-720p.mp4",
          label: "720p"
        },
        {       
         file:
            "https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-576p.mp4",
          label: "576p"
        }
      ],
      captions: [
        {
          file:
            "https://raw.githubusercontent.com/Foilz/jwplayer/main/%5BBengali%5D%20Sprite%20Fright%20-%20Blender%20Open%20Movie.srt",
          label: "Indonesian",
          kind: "captions"
        },
        {
          
          file:
            "https://raw.githubusercontent.com/Foilz/jwplayer/main/%5BSpanish%5D%20Sprite%20Fright%20-%20Blender%20Open%20Movie.srt",
          label: "English",
          kind: "captions"
        }
      ],
      tracks: [
        {
          file:
            "https://raw.githubusercontent.com/Foilz/jwplayer/main/mosaic.vtt",
          kind: "thumbnails"
        }
      ]
    }
  ]
});

playerInstance.on("ready", function () {
  // Move the timeslider in-line with other controls
  const playerContainer = playerInstance.getContainer();
  const buttonContainer = playerContainer.querySelector(".jw-button-container");
  const spacer = buttonContainer.querySelector(".jw-spacer");
  const timeSlider = playerContainer.querySelector(".jw-slider-time");
  buttonContainer.replaceChild(timeSlider, spacer);
});
