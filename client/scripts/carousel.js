// Carousel de filmes da Home 
var splide = new Splide( '.splide', {
  perPage: 6,
  perMove: 1,
  pagination: false,
  gap: '10px',
  rewind : true,
  breakpoints: {
		850: {
			perPage: 4,
		},
    500: {
			perPage: 3,
		},
  }
} );

splide.mount();