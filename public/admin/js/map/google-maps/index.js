class Marker {
    constructor(drawingManager, markers) {
        this.drawingManager = drawingManager;
        this.markers = markers;
        this.drawingManager.setOptions(this.getOptions());
        this.create();
        this.delete();
    }

    getOptions() {
        return {
            markerOptions: {
                clickable: true,
                draggable: true,
                editable: true,
            }
        };
    }

    create() {
        const self = this;
        this.drawingManager.addListener('markercomplete', function (marker) {
            marker.index = self.markers.length;
            self.markers.push(marker);
            $('.map__control-panel__markers').append(`
                <div class="map__control-panel__marker" data-key="${marker.index}">
                    <span class="marker__content">Địa chỉ ${marker.index + 1}</span>
                    <button class="marker__delete-btn"><i class="fa fa-times"></i></button>
                </div>`
            );
        });
    }

    delete() {
        const self = this;
        $(document).on('click', '.marker__delete-btn', function () {
            const $markerElement = $(this).parent().closest('.map__control-panel__marker');
            const index = $markerElement.data('key');
            self.markers[index].setMap(null);
            self.markers.splice(index, 1);
            $markerElement.remove();
            self.reloadMarkersIndex();
        });
    }

    reloadMarkersIndex() {
        const $elements = $('.map__control-panel__marker');
        for (let i = 0; i < $elements.length; i += 1) {
            $($elements[i]).attr('data-key', i);
            $($elements[i]).find('.marker__content').text(`Địa chỉ ${i + 1}`)
        }
    }

    clickOnMarkerControlPanel(map) {
        const self = this;
        $(document).on('click', '.marker__content', function () {
            const index = $(this).parent().closest('.map__control-panel__marker').data('key');
            map.setCenter(self.markers[index].getPosition());
        });
    }
}

class Polygon {
    constructor(drawingManager, polygons) {
        this.drawingManager = drawingManager;
        this.polygons = polygons;
        this.drawingManager.setOptions(this.getOptions());
        this.create();
        this.delete();
    }

    getOptions() {
        return {
            polygonOptions: {
                strokeColor: '#3388ff',
                strokeWeight: 4,
                strokeOpacity: 0.8,
                fillColor: '#3388ff',
                fillOpacity: 0.2,
                clickable: true,
                draggable: true,
                editable: true,
                zIndex: 1
            },
            rectangleOptions: {
                strokeColor: '#3388ff',
                strokeWeight: 4,
                strokeOpacity: 0.8,
                fillColor: '#3388ff',
                fillOpacity: 0.2,
                clickable: true,
                draggable: true,
                editable: true,
                zIndex: 1,
            },
        };
    }

    create() {
        const self = this;
        this.drawingManager.addListener('overlaycomplete', function (event) {
            if (event.type === 'polygon' || event.type === 'rectangle') {
                const polygon = event.overlay;
                polygon.index = self.polygons.length;
                self.polygons.push(polygon);
                $('.map__control-panel__polygons').append(`
                    <div class="map__control-panel__polygon" data-key="${polygon.index}">
                        <span class="polygon__content">Khu vực ${polygon.index + 1}</span>
                        <span class="polygon__options">
                            <button class="polygon__edit-color-btn"><i class="fa fa-wrench"></i></button>
                            <button class="polygon__delete-btn"><i class="fa fa-times"></i></button>
                        </span>
                    </div>`
                );
                self.changeColor();
                self.click(polygon);
                google.maps.event.addListener(polygon, 'click', function () {
                    self.click(polygon);
                });
            }
        });
    }

    delete() {
        const self = this;
        $(document).on('click', '.polygon__delete-btn', function () {
            const $polygonElement = $(this).parent().closest('.map__control-panel__polygon');
            const index = $polygonElement.data('key');
            self.polygons[index].setMap(null);
            self.polygons.splice(index, 1);
            $polygonElement.find('.polygon__edit-color-btn').spectrum('hide');
            $polygonElement.remove();
            self.reloadMarkersIndex();
            self.changeColor();
        });
    }

    reloadMarkersIndex() {
        const $elements = $('.map__control-panel__polygon');
        for (let i = 0; i < $elements.length; i += 1) {
            $($elements[i]).attr('data-key', i);
            $($elements[i]).find('.polygon__content').text(`Vị trí ${i + 1}`);
        }
    }

    changeColor() {
        const self = this;
        $('.polygon__edit-color-btn').spectrum({
            showPaletteOnly: true,
            showPalette:true,
            color: 'blanchedalmond',
            palette: [
                ['black', 'white', 'blanchedalmond',
                    'rgb(255, 128, 0);', 'hsv 100 70 50'],
                ['red', 'yellow', 'green', 'blue', 'violet']
            ],
            change: function (color) {
                const index = $(this).parent().closest('.map__control-panel__polygon').data('key');
                if (self.polygons[index]) {
                    self.polygons[index].setOptions({
                        fillColor: color.toHexString(),
                        strokeColor: color.toHexString(),
                    });
                }
            }
        });
    }

    click(polygon) {
        for (let i = 0; i < this.polygons.length; i++) {
            if (this.polygons[i].index === polygon.index) {
                continue;
            }
            this.polygons[i].setOptions({
                draggable: false,
                editable: false,
            });
        }
        polygon.setOptions({
            draggable: true,
            editable: true,
        });
    }

    clickOnPolygonControlPanel(map) {
        const self = this;
        $(document).on('click', '.polygon__content', function () {
            const index = $(this).parent().closest('.map__control-panel__polygon').data('key');
            let bounds;
            if (self.polygons[index].getPath) {
                bounds = new google.maps.LatLngBounds();
                self.polygons[index].getPath().getArray().forEach(function (latLng) {
                    bounds.extend(latLng);
                });
            } else {
                bounds = self.polygons[index].getBounds();
            }
            map.fitBounds(bounds, 180);
        });
    }
}

let map;
const markers = [];
const polygons = [];

function initMap() {
    // definePopupClass();
    map = new google.maps.Map(document.getElementById('map-content'), {
        center: { lat: -34.397, lng: 150.644 },
        zoom: 8,
        mapTypeId: 'satellite',
        fullscreenControl: false,
    });
    const drawingManager = addDrawingTool();
    const marker = new Marker(drawingManager, markers);
    marker.clickOnMarkerControlPanel(map);
    const polygon = new Polygon(drawingManager, polygons);
    polygon.clickOnPolygonControlPanel(map);
}

function addDrawingTool() {
    const drawingManager = new google.maps.drawing.DrawingManager({
        drawingMode: null,
        drawingControl: true,
        drawingControlOptions: {
            position: google.maps.ControlPosition.TOP_CENTER,
            drawingModes: ['marker', 'polygon', 'rectangle']
        },
    });
    drawingManager.setMap(map);

    return drawingManager;
}
