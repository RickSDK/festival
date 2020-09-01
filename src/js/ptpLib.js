function ngClassGenre(genre) {
  if (genre == 'Comedy')
    return 'fa fa-smile-o';
  if (genre == 'Documentary')
    return 'fa fa-video-camera';
  if (genre == 'Sci-Fi')
    return 'fa fa-rocket';
  if (genre == 'Drama')
    return 'fa fa-film';
  if (genre == 'Horror')
    return 'fa fa-bolt';
  if (genre == 'Music Video' || genre == 'Musical')
    return 'fa fa-music';
  if (genre == 'Other')
    return 'fa fa-question-circle';

  return 'fa fa-android';
}