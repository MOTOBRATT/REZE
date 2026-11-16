/* ARTS: the list of pictures (the order here is the order on the page).
   To add a picture: put the file into assets/arts/ and add one line below:  { file: 'name.jpg' },
   or just run  python3 tools/update-arts.py  and it adds every new file for you.
   The layout is made automatically from each photo's own proportions, nothing is cropped or stretched.
   Optional settings for a line:
     alt: 'short description'        text for screen readers
     caption: 'text'                 small caption under the photo (none by default)
     size: 's' | 'm' | 'l' | 'full'  force a smaller / larger frame
     ratio: '4/5', pos: '50% 20%'    only if you WANT a fixed crop: frame shape + visible part of the photo */
REZE.arts = [
  { file: 'sunset-beach.jpg', alt: 'Reze on a beach at sunset, looking aside' },
  { file: 'rain-bouquet.jpg', alt: 'Reze standing in the rain at night, holding a bouquet' },
  { file: 'profile-sea.jpg', alt: 'Reze in profile in front of a pale sea' },
  { file: 'window-city.jpg', alt: 'Reze with her eyes closed, leaning on the Bomb Devil in front of a city view' },
  { file: 'bomb-devil-hand.jpg', alt: 'The Bomb Devil crouching, one hand reaching out, dynamite on her arms' },
  { file: 'mirror-bomb-devil.jpg', alt: 'Reze holding her head, facing the Bomb Devil in a dark glass' },
  { file: 'blue-face.jpg', alt: 'Close portrait of Reze in cold blue light' },
  { file: 'sunlit-portrait.jpg', alt: 'Reze smiling in green sunlight, trees blurred behind her' },
  { file: 'dove.jpg', alt: 'Reze with a white dove covering her eyes' },
  { file: 'stairs.jpg', alt: 'Reze in a long black coat walking down white stairs' },
  { file: 'bottle.jpg', alt: 'Close-up of Reze drinking from a plastic bottle' },
  { file: 'chains.jpg', alt: 'Reze and the Bomb Devil among blue leaves and teal chains', size: 's' },
  { file: 'water-portrait.jpg', alt: 'Reze in dark water, one hand in her hair', size: 'm' },
];
