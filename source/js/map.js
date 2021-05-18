if (window.matchMedia('(max-width: 767px)').matches) {
  ymaps.ready(function () {
    let myMap = new ymaps.Map('map', {
        center: [59.938635, 30.323118],
        zoom: 14,
        controls: ['zoomControl']
    }, {
        searchControlProvider: 'yandex#search'
    });
    let myPlacemark = new ymaps.Placemark([59.938635, 30.323118], {}, {
        iconLayout: 'default#image',
        iconImageHref: './img/backgrounds/map-pin-mob.png',
        iconImageSize: [57, 53],
        iconImageOffset: [-27, -51]
    });

    myMap.geoObjects.add(myPlacemark);
  });
} else if (window.matchMedia('(max-width: 1439px)').matches) {
  ymaps.ready(function () {
    let myMap = new ymaps.Map('map', {
        center: [59.938635, 30.323118],
        zoom: 15,
        controls: ['zoomControl']
    }, {
        searchControlProvider: 'yandex#search'
    });
    let myPlacemark = new ymaps.Placemark([59.938635, 30.323118], {}, {
        iconLayout: 'default#image',
        iconImageHref: './img/backgrounds/map-pin.png',
        iconImageSize: [113, 106],
        iconImageOffset: [-51, -102]
    });

    myMap.geoObjects.add(myPlacemark);
  });
} else {
  ymaps.ready(function () {
    let myMap = new ymaps.Map('map', {
        center: [59.938865, 30.317744],
        zoom: 16,
        controls: ['zoomControl']
    }, {
        searchControlProvider: 'yandex#search'
    });
    let myPlacemark = new ymaps.Placemark([59.938635, 30.323118], {}, {
        iconLayout: 'default#image',
        iconImageHref: './img/backgrounds/map-pin.png',
        iconImageSize: [113, 106],
        iconImageOffset: [-51, -102]
    });

    myMap.geoObjects.add(myPlacemark);
  });
}
