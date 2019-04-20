import React from 'react';
import Galery from 'react/components/galery/Galery';

import dog from 'img/dog.jpg';
import rabbit from 'img/rabbit.jpg';
import goose from 'img/goose.jpg';
import woodcock from 'img/woodcock.jpg';

const images = [
  { id: 1, img: dog, alt: 'Photo by Tadeusz Lakota on Unsplash' },
  { id: 2, img: rabbit, alt: 'Photo by Steve Harvey on Unsplash' },
  { id: 4, img: goose, alt: 'Photo by Gary Bendig on Unsplash' },
  { id: 5, img: woodcock, alt: 'Photo by Ronald Slabke on Wikicommons' },
];

/** Galery page. */
export default function () {
  return (<Galery images={images} />);
}
