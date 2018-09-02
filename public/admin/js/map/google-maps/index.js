toastr.options = {
    "closeButton": false,
    "debug": false,
    "newestOnTop": false,
    "progressBar": false,
    "positionClass": "toast-bottom-right",
    "preventDuplicates": false,
    "onclick": null,
    "showDuration": "300",
    "hideDuration": "2000",
    "timeOut": "10000",
    "extendedTimeOut": "2000",
    "showEasing": "linear",
    "hideEasing": "swing",
    "showMethod": "fadeIn",
    "hideMethod": "fadeOut"
};

class Marker {
    constructor(drawingManager, map) {
        const propertyArticle = $('.map').data('key');
        this.url = `/v1/property/articles/${propertyArticle}/addresses`;
        this.drawingManager = drawingManager;
        this.map = map;
        this.markers = {
            total: [],
            created: [],
            updated: [],
            deleted: [],
        };
        this.drawingManager.setOptions(this.getOptions());
        this.create();
        this.delete();
        this.save();
        this.clickOnMarkerControlPanel(this.map);
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

    getHtmlMarker(marker) {
        return  `<div class="map__control-panel__marker" data-key="${marker.index}">
            <span class="marker__content">Địa chỉ ${marker.index + 1}</span>
            <button class="marker__delete-btn"><i class="fa fa-times"></i></button>
        </div>`;
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
            if (!markers[i]) {
                return;
            }
            marker = new google.maps.Marker({
                position: new google.maps.LatLng(
                    markers[i].location.coordinates[0],
                    markers[i].location.coordinates[1]
                ),
                _id: markers[i]._id,
                index: i,
                clickable: true,
                draggable: true,
                editable: true,
            });
            marker.setMap(this.map);
            $('.map__control-panel__markers').append(this.getHtmlMarker(marker));
            this.markers.total.push(marker);
            this.update(marker);
        }
    }

    create() {
        const self = this;
        this.drawingManager.addListener('markercomplete', function (marker) {
            marker.index = self.markers.total.length;
            self.markers.total.push(marker);
            self.markers.created.push(self.getData(marker));
            $('.map__control-panel__markers').append(self.getHtmlMarker(marker));
            self.update(marker);
        });
    }

    update(marker) {
        const self = this;
        marker.addListener('dragend', function () {
            let check = !marker._id;
            const markers = (marker._id) ? self.markers.updated : self.markers.created;
            markers.some(function (currentMarker, index) {
                if (currentMarker.index === marker.index) {
                    markers[index] = self.getData(marker);
                    check = true;
                    return true;
                }
            });
            if (!check) {
                self.markers.updated.push(self.getData(marker));
            }
        });
    }

    delete() {
        const self = this;
        $(document).on('click', '.marker__delete-btn', function () {
            const $markerElement = $(this).parent().closest('.map__control-panel__marker');
            const index = $markerElement.data('key');
            self.markers.total[index].setMap(null);
            if (self.markers.total[index]._id) {
                self.markers.deleted.push(self.markers.total[index]._id);
            }
            self.markers.total.splice(index, 1);
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
            map.setCenter(self.markers.total[index].getPosition());
        });
    }

    getData(marker) {
        const currentMarker = {
            index: marker.index,
            lat: marker.getPosition().lat(),
            lng: marker.getPosition().lng(),
        };
        if (marker._id) {
            currentMarker._id = marker._id;
        }
        return currentMarker;
    }

    save() {
        const self = this;
        $('.map__control-panel__save-btn').on('click', async function () {
            let result;
            if (self.markers.created.length > 0) {
                result = await self.sendStoreRequest();
            }
            if (self.markers.updated.length > 0) {
                result = await self.sendUpdateRequest();
            }
            if (self.markers.deleted.length > 0) {
                result = await self.sendDeleteRequest();
            }
            if (result === true) {
                toastr.success('Lưu địa chỉ thành công');
            }
        });
    }

    extendBounds(bounds) {
        if (!this.markers.total.length) {
            return false;
        }
        this.markers.total.forEach((currentMarker) => {
            const coordinate = marker.getData(currentMarker);
            bounds.extend(new google.maps.LatLng(coordinate.lat, coordinate.lng));
        });

        return true;
    }

    async sendStoreRequest() {
        const res = await sendDataRequest(this.url, 'POST', {
            addresses: this.markers.created,
        });
        if (!res.status) {
            toastr.error(res.error.message[0]);
            return false;
        }
        this.markers.total.forEach((marker, index) => {
            this.markers.created.some((newMarker, newIndex) => {
                if (newMarker.index === marker.index) {
                    this.markers.total[index]._id = res.data[newIndex]._id;
                    return true;
                }
            });
        });
        this.markers.created = [];
        return true;
    }

    async sendUpdateRequest() {
        const res = await sendDataRequest(this.url, 'PATCH', {
            _method: 'PATCH',
            addresses: this.markers.updated,
        });
        if (!res.status) {
            toastr.error(res.error.message[0]);
            return false;
        }
        this.markers.updated = [];
        return true;
    }

    async sendDeleteRequest() {
        const res = await sendDataRequest(this.url, 'DELETE', {
            _method: 'DELETE',
            addresses: this.markers.deleted,
        });
        if (!res.status) {
            toastr.error(res.error.message[0]);
            return false;
        }
        this.markers.deleted = [];
        return true;
    }
}

class Polygon {
    constructor(drawingManager, map) {
        const propertyArticle = $('.map').data('key');
        this.url = `/v1/property/articles/${propertyArticle}/areas`;
        this.drawingManager = drawingManager;
        this.map = map;
        this.polygons = {
            total: [],
            created: [],
            updated: [],
            deleted: [],
        };
        this.drawingManager.setOptions(this.getOptions());
        this.create();
        this.delete();
        this.save();
        this.clickOnPolygonControlPanel(this.map);
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

    getHtmlPolygon(polygon) {
        return  `<div class="map__control-panel__polygon" data-key="${polygon.index}">
            <span class="polygon__content">Khu vực ${polygon.index + 1}</span>
            <span class="polygon__options">
                <button class="polygon__edit-color-btn"><i class="fa fa-wrench"></i></button>
                <button class="polygon__delete-btn"><i class="fa fa-times"></i></button>
            </span>
        </div>`;
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
            if (!polygons[i]) {
                return;
            }
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
                    clickable: true,
                    draggable: true,
                    editable: true,
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
                    clickable: true,
                    draggable: true,
                    editable: true,
                    zIndex: 1,
                    map: this.map,
                    index: i,
                    _id: polygons[i]._id,
                    bounds: polygons[i].coordinates.rectangle,
                });
                console.log(i);
            } else {
                continue;
            }
            polygon.setMap(this.map);
            $('.map__control-panel__polygons').append(this.getHtmlPolygon(polygon));
            this.polygons.total.push(polygon);
            this.update(polygon);
            this.changeColor(i);
        }
    }

    create() {
        const self = this;
        this.drawingManager.addListener('overlaycomplete', function (event) {
            if (event.type === 'polygon' || event.type === 'rectangle') {
                const polygon = event.overlay;
                if (polygon.getPath && polygon.getPath().getArray().length <= 2) {
                    polygon.setMap(null);
                    return false;
                }
                polygon.index = self.polygons.total.length;
                self.polygons.total.push(polygon);
                self.polygons.created.push(self.getData(polygon));
                $('.map__control-panel__polygons').append(self.getHtmlPolygon(polygon));
                self.changeColor(polygon.index);
                self.update(polygon);
                self.click(polygon);
                google.maps.event.addListener(polygon, 'click', function () {
                    self.click(polygon);
                });
            }
        });
    }

    update(polygon) {
        const self = this;
        polygon.addListener('dragend', function () {
            let check = !polygon._id;
            const polygons = (polygon._id) ? self.polygons.updated : self.polygons.created;
            polygons.some(function (currentPolygon, index) {
                if (currentPolygon.index === polygon.index) {
                    polygons[index] = self.getData(polygon);
                    check = true;
                    return true;
                }
            });
            if (!check) {
                self.polygons.updated.push(self.getData(polygon));
            }
        });
    }

    delete() {
        const self = this;
        $(document).on('click', '.polygon__delete-btn', function () {
            const $polygonElement = $(this).parent().closest('.map__control-panel__polygon');
            const index = $polygonElement.data('key');
            self.polygons.total[index].setMap(null);
            if (self.polygons.total[index]._id) {
                self.polygons.deleted.push(self.polygons.total[index]._id);
            }
            self.polygons.total.splice(index, 1);
            $polygonElement.find('.polygon__edit-color-btn').spectrum('hide');
            $polygonElement.remove();
            self.reloadMarkersIndex();
        });
    }

    reloadMarkersIndex() {
        const $elements = $('.map__control-panel__polygon');
        for (let i = 0; i < $elements.length; i += 1) {
            $($elements[i]).attr('data-key', i);
            $($elements[i]).find('.polygon__content').text(`Khu vực ${i + 1}`);
        }
    }

    changeColor(index) {
        const self = this;
        $(`.map__control-panel__polygon[data-key="${index}"] .polygon__edit-color-btn`).spectrum({
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
                const polygon = self.polygons.total[index];
                if (polygon) {
                    polygon.setOptions({
                        fillColor: color.toHexString(),
                        strokeColor: color.toHexString(),
                    });
                }
                const polygons = (polygon._id) ? self.polygons.updated : self.polygons.created;
                let check = false;
                polygons.some(function (currentPolygon, index) {
                    if (currentPolygon.index === polygon.index) {
                        polygons[index].color = color.toHexString();
                        check = true;
                        return true;
                    }
                });
                if (!check) {
                    self.polygons.updated.push(self.getData(polygon));
                }
            }
        });
    }

    click(polygon) {
        for (let i = 0; i < this.polygons.total.length; i++) {
            if (this.polygons.total[i].index === polygon.index) {
                continue;
            }
            this.polygons.total[i].setOptions({
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
            if (self.polygons.total[index].getPath) {
                bounds = new google.maps.LatLngBounds();
                self.polygons.total[index].getPath().getArray().forEach(function (latLng) {
                    bounds.extend(latLng);
                });
            } else {
                bounds = self.polygons.total[index].getBounds();
            }
            map.fitBounds(bounds, 180);
        });
    }

    getData(polygon) {
        let coordinates;
        let shape;
        if (!polygon.getPath) {
            shape = 2;
            const bounds = polygon.getBounds();
            coordinates = {
                north: bounds.getNorthEast().lat(),
                south: bounds.getSouthWest().lat(),
                east: bounds.getNorthEast().lng(),
                west: bounds.getSouthWest().lng(),
            };
        } else {
            shape = 1;
            coordinates = polygon.getPath().getArray().map((coordinate) => {
                return [coordinate.lat(), coordinate.lng()];
            });
        }
        const currentPolygon = {
            index: polygon.index,
            shape,
            coordinates,
            color: polygon.get('fillColor')
        };
        if (polygon._id) {
            currentPolygon._id = polygon._id;
        }
        return currentPolygon;
    }

    save() {
        const self = this;
        $('.map__control-panel__save-btn').on('click', async function () {
            let result;
            if (self.polygons.created.length > 0) {
                result = await self.sendStoreRequest();
            }
            if (self.polygons.updated.length > 0) {
                result = await self.sendUpdateRequest();
            }
            if (self.polygons.deleted.length > 0) {
                result = await self.sendDeleteRequest();
            }
            if (result === true) {
                toastr.success('Lưu khu vực thành công');
            }
        });
    }

    extendBounds(bounds) {
        if (!this.polygons.total.length) {
            return false;
        }
        this.polygons.total.forEach((currentPolygon) => {
            if (currentPolygon.getPath) {
                currentPolygon.getPath().getArray().forEach((coordinate) => {
                    bounds.extend(new google.maps.LatLng(coordinate.lat(), coordinate.lng()));
                });
                return true;
            }
            bounds.extend(currentPolygon.getBounds().getNorthEast());
            bounds.extend(currentPolygon.getBounds().getSouthWest());
        });

        return true;
    }

    async sendStoreRequest() {
        const res = await sendDataRequest(this.url, 'POST', {
            areas: this.polygons.created,
        });
        if (!res.status) {
            toastr.error(res.error.message[0]);
            return false;
        }
        this.polygons.total.forEach((polygon, index) => {
            this.polygons.created.some((newPolygon, newIndex) => {
                if (newPolygon.index === polygon.index) {
                    this.polygons.total[index]._id = res.data[newIndex]._id;
                    return true;
                }
            });
        });
        this.polygons.created = [];
        return true;
    }

    async sendUpdateRequest() {
        const res = await sendDataRequest(this.url, 'PATCH', {
            _method: 'PATCH',
            areas: this.polygons.updated,
        });
        if (!res.status) {
            toastr.error(res.error.message[0]);
            return false;
        }
        this.polygons.updated = [];
        return true;
    }

    async sendDeleteRequest() {
        const res = await sendDataRequest(this.url, 'DELETE', {
            _method: 'DELETE',
            areas: this.polygons.deleted,
        });
        if (!res.status) {
            toastr.error(res.error.message[0]);
            return false;
        }
        this.polygons.deleted = [];
        return true;
    }
}

let map;
let marker;
let polygon;

async function initMap() {
    map = new google.maps.Map(document.getElementById('map-content'), {
        center: { lat: 16.0471659, lng: 108.2116865 },
        zoom: 13,
        mapTypeId: 'satellite',
        fullscreenControl: false,
    });
    const drawingManager = addDrawingTool();
    marker = new Marker(drawingManager, map);
    polygon = new Polygon(drawingManager, map);
    await Promise.all([marker.list(), polygon.list()]);
    const bounds = new google.maps.LatLngBounds();
    const hasMarker = marker.extendBounds(bounds);
    const hasPolygon = polygon.extendBounds(bounds);
    if (hasMarker || hasPolygon) {
        map.fitBounds(bounds, 100);
    }
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

function sendDataRequest(url, method, data) {
    const token = $('.map').data('token');
    const request = new Request(url, {
        method,
        body: JSON.stringify(data),
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
    });

    return fetch(request).then(res => res.json());
}

function getDataRequest(url) {
    return fetch(url).then(res => res.json());
}
