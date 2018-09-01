class Marker {
    constructor(map) {
        const propertyArticle = $('.map').data('key');
        this.url = `/v1/property/articles/${propertyArticle}/addresses`;
        this.map = map;
        this.list();
    }

    async list() {
        let markers = [];
        const getAddresses = async (url, data) => {
            if (data && !data.nextPageUrl) {
                return true;
            }
            const res = await getDataRequest(url);
            markers = markers.concat(res.data.docs);
            await getAddresses(res.data.nextPageUrl, res.data);
        };
        await getAddresses(this.url);
        let marker;
        for (let i = 0; i < markers.length; i += 1) {
            marker = new google.maps.Marker({
                position: new google.maps.LatLng(
                    markers[i].location.coordinates[0],
                    markers[i].location.coordinates[1]
                ),
                _id: markers[i]._id,
                index: i,
            });
            marker.setMap(this.map);
        }
    }
}

class Polygon {
    constructor(map) {
        const propertyArticle = $('.map').data('key');
        this.url = `/v1/property/articles/${propertyArticle}/areas`;
        this.map = map;
        this.list();
    }

    async list() {
        let polygons = [];
        const getAreas = async (url, data) => {
            if (data && !data.nextPageUrl) {
                return true;
            }
            const res = await getDataRequest(url);
            polygons = polygons.concat(res.data.docs);
            await getAreas(res.data.nextPageUrl, res.data);
        };
        await getAreas(this.url);
        let polygon;
        for (let i = 0; i < polygons.length; i += 1) {
            if (polygons[i].coordinates.shape === 1) {
                const coordinates = polygons[i].coordinates.polygon.map((coordinate) => ({
                    lat: coordinate[0], lng: coordinate[1],
                }));
                polygon = new google.maps.Polygon({
                    path: coordinates,
                    strokeColor: polygons[i].color,
                    strokeWeight: 4,
                    strokeOpacity: 0.8,
                    fillColor: polygons[i].color,
                    fillOpacity: 0.2,
                    zIndex: 1,
                    index: i,
                    _id: polygons[i]._id,
                });
            } else if (polygons[i].coordinates.shape === 2) {
                polygon = new google.maps.Rectangle({
                    strokeColor: polygons[i].color,
                    strokeWeight: 4,
                    strokeOpacity: 0.8,
                    fillColor: polygons[i].color,
                    fillOpacity: 0.2,
                    zIndex: 1,
                    map: this.map,
                    index: i,
                    _id: polygons[i]._id,
                    bounds: polygons[i].coordinates.rectangle,
                });
            } else {
                continue;
            }
            polygon.setMap(this.map);
        }
    }
}

let map;
let marker;
let polygon;

function initMap() {
    map = new google.maps.Map(document.getElementById('map-content'), {
        center: { lat: -25.397, lng: 150.644 },
        zoom: 5,
        mapTypeId: 'satellite',
        fullscreenControl: false,
    });
    marker = new Marker(map);
    polygon = new Polygon(map);
}

function getDataRequest(url) {
    return fetch(url).then(res => res.json());
}
