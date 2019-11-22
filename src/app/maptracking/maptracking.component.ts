import { Component, OnInit } from '@angular/core';
// import * as ol from '../../../node_modules/ol';

import Feature from 'ol/Feature.js';
import Map from 'ol/Map.js';
import View from 'ol/View.js';
import GeoJSON from 'ol/format/GeoJSON.js';
import { Tile as TileLayer, Vector as VectorLayer } from 'ol/layer.js';
import { OSM, Vector as VectorSource } from 'ol/source.js';
import { Circle as CircleStyle, Stroke, Style } from 'ol/style.js';
import { Point as GeomPoint } from 'ol/geom';
import { transform, fromLonLat } from 'ol/proj';


@Component({
    selector: 'app-maptracking',
    templateUrl: './maptracking.component.html',
    styleUrls: ['./maptracking.component.css']
})
export class MaptrackingComponent implements OnInit {
    // map: Map;

    geojsonObject: any;
    radar: CircleStyle;
    image: CircleStyle;
    vectorSource: VectorSource;
    vectorLayer: VectorLayer;


    constructor() {
    }

    ngOnInit() {
        this.radar = new CircleStyle({
            radius: 12,
            fill: null,
            stroke: new Stroke({ color: 'blue', width: 4 })
        });

        this.image = new CircleStyle({
            radius: 8,
            fill: null,
            stroke: new Stroke({ color: 'red', width: 4 })
        });

        var styles = {

            'MultiPoint': new Style({
                image: this.radar
            }),

            'Point': new Style({
                image: this.image
            }),

        };

        var styleFunction = function (feature) {
            return styles[feature.getGeometry().getType()];
        };



        // added some geojson data hera as a variable. In future we will fetch this from API using angular services.

        this.geojsonObject = {
            "type": "FeatureCollection",
            "features": [{
                "type": "Feature",
                "geometry": {
                    "type": "Point",
                    "coordinates": [9.83752162, 57.09696925]
                },
                "properties": {
                    "Gain": 0,
                    "Sea": 0,
                    "Range": 7129,
                    "RadarType": "?",
                    "North": 60.0,
                    "SwipeTime": "2019-11-08T11:59:59.5217566Z"
                }
            }, {
                "type": "Feature",
                "geometry": {
                    "type": "Point",
                    "coordinates": [9.8527713578474181, 57.117449716452022]
                },
                "properties": {
                    "TrackId": "00dc83bd579e75a0fdbd5dd547d161cd",
                    "LastObservationTS": "2019-11-08T11:59:59.5217566Z",
                    "TrackLength": 3,
                    "Speed": "40",
                    "AvgSpeed": "34,3",
                    "Course": 60,
                    "Direction": "NE",
                    "LastAngle": null,
                    "XY": "711, 658"
                }
            }, {
                "type": "Feature",
                "geometry": {
                    "type": "Point",
                    "coordinates": [9.8163134138453216, 57.072616500358357]
                },
                "properties": {
                    "TrackId": "02fdc718152bc82d6c1c44f24bc08c99",
                    "LastObservationTS": "2019-11-08T11:59:59.5217566Z",
                    "TrackLength": 4,
                    "Speed": "58,3",
                    "AvgSpeed": "64,5",
                    "Course": 138,
                    "Direction": "SE",
                    "LastAngle": "-16,3",
                    "XY": "1113, 1208"
                }
            }, {
                "type": "Feature",
                "geometry": {
                    "type": "Point",
                    "coordinates": [9.8373939538420085, 57.04442534845321]
                },
                "properties": {
                    "TrackId": "0ad4e16d207f2b2cb791e21bfe1eabd3",
                    "LastObservationTS": "2019-11-08T11:59:54.4751763Z",
                    "TrackLength": 8,
                    "Speed": "89,2",
                    "AvgSpeed": "57,7",
                    "Course": 110,
                    "Direction": "E",
                    "LastAngle": "-11,4",
                    "XY": "1532, 1266"
                }
            },
            {
                "type": "Feature",
                "geometry": {
                    "type": "Point",
                    "coordinates": [9.8685001156644123, 57.095300214486578]
                },
                "properties": {
                    "TrackId": "23f7c0a96e3af80447b7e13043525b88",
                    "LastObservationTS": "2019-11-08T11:59:59.5217566Z",
                    "TrackLength": 5,
                    "Speed": "47,1",
                    "AvgSpeed": "48,5",
                    "Course": 225,
                    "Direction": "SW",
                    "LastAngle": "-0,7",
                    "XY": "1037, 709"
                }
            }, {
                "type": "Feature",
                "geometry": {
                    "type": "Point",
                    "coordinates": [9.827795078538065, 57.083532801181484]
                },
                "properties": {
                    "TrackId": "2590b27eed309bba736273d8841e101b",
                    "LastObservationTS": "2019-11-08T11:59:56.9999752Z",
                    "TrackLength": 12,
                    "Speed": "34,3",
                    "AvgSpeed": "39,9",
                    "Course": 239,
                    "Direction": "SW",
                    "LastAngle": "-24,8",
                    "XY": "1025, 1057"
                }
            }, {
                "type": "Feature",
                "geometry": {
                    "type": "Point",
                    "coordinates": [9.9485766633183541, 57.099348336882954]
                },
                "properties": {
                    "TrackId": "2ff777b0fcd5af3540cf403263780222",
                    "LastObservationTS": "2019-11-08T11:59:59.5217566Z",
                    "TrackLength": 4,
                    "Speed": "68,6",
                    "AvgSpeed": "54,4",
                    "Course": 60,
                    "Direction": "NE",
                    "LastAngle": "-7,9",
                    "XY": "1290, 157"
                }
            }, {
                "type": "Feature",
                "geometry": {
                    "type": "Point",
                    "coordinates": [9.8461062451051262, 57.077232341818359]
                },
                "properties": {
                    "TrackId": "3192b0ccf3a50b29f5bca73a04949e74",
                    "LastObservationTS": "2019-11-08T11:59:59.5217566Z",
                    "TrackLength": 10,
                    "Speed": "58,3",
                    "AvgSpeed": "50,1",
                    "Course": 228,
                    "Direction": "SW",
                    "LastAngle": "-32,1",
                    "XY": "1170, 981"
                }
            }, {
                "type": "Feature",
                "geometry": {
                    "type": "Point",
                    "coordinates": [9.8515845829855575, 57.1136722033487]
                },
                "properties": {
                    "TrackId": "36260ad091bb56e4f0c357b7c4e45657",
                    "LastObservationTS": "2019-11-08T11:59:54.4751763Z",
                    "TrackLength": 6,
                    "Speed": "36,1",
                    "AvgSpeed": "51,4",
                    "Course": 78,
                    "Direction": "E",
                    "LastAngle": "-2,4",
                    "XY": "752, 692"
                }
            },

            {
                "type": "Feature",
                "geometry": {
                    "type": "Point",
                    "coordinates": [9.7773914374133053, 57.0606320001128]
                },
                "properties": {
                    "TrackId": "0d90cc67e3444271cde0aa5d36022b05",
                    "LastObservationTS": "2019-11-08T11:59:59.5217566Z",
                    "TrackLength": 3,
                    "Speed": "70,7",
                    "AvgSpeed": "60,7",
                    "Course": 163,
                    "Direction": "S",
                    "LastAngle": null,
                    "XY": "1110, 1546"
                }
            }, {
                "type": "Feature",
                "geometry": {
                    "type": "Point",
                    "coordinates": [9.8464063229898464, 57.076661921478937]
                },
                "properties": {
                    "TrackId": "13104c4821c7c3d5597d5d8c8755b323",
                    "LastObservationTS": "2019-11-08T11:59:59.5217566Z",
                    "TrackLength": 15,
                    "Speed": "61,6",
                    "AvgSpeed": "61,2",
                    "Course": 308,
                    "Direction": "NW",
                    "LastAngle": "-6,8",
                    "XY": "1178, 983"
                }
            },

            {
                "type": "Feature",
                "geometry": {
                    "type": "Point",
                    "coordinates": [9.8276301473078114, 57.085558103087692]
                },
                "properties": {
                    "TrackId": "a2135afbbc64a70341426a9c50cad21d",
                    "LastObservationTS": "2019-11-08T11:59:59.5217566Z",
                    "TrackLength": 10,
                    "Speed": "47,1",
                    "AvgSpeed": "42,7",
                    "Course": 254,
                    "Direction": "W",
                    "LastAngle": "11,4",
                    "XY": "1000, 1044"
                }
            }, {
                "type": "Feature",
                "geometry": {
                    "type": "Point",
                    "coordinates": [9.8199104561183628, 57.0818887233919]
                },
                "properties": {
                    "TrackId": "b3fcf99efeac4e9cec92dd7e07c5c7d7",
                    "LastObservationTS": "2019-11-08T11:59:59.5217566Z",
                    "TrackLength": 5,
                    "Speed": "57,2",
                    "AvgSpeed": "57,3",
                    "Course": 239,
                    "Direction": "SW",
                    "LastAngle": "-7",
                    "XY": "1015, 1120"
                }
            }, {
                "type": "Feature",
                "geometry": {
                    "type": "Point",
                    "coordinates": [9.8672369715913035, 57.068409972810848]
                },
                "properties": {
                    "TrackId": "c1327c80e35fb853c0762a5d2592cf42",
                    "LastObservationTS": "2019-11-08T11:59:59.5217566Z",
                    "TrackLength": 5,
                    "Speed": "47,1",
                    "AvgSpeed": "67,6",
                    "Course": 315,
                    "Direction": "NW",
                    "LastAngle": "-244,7",
                    "XY": "1356, 904"
                }
            }, {
                "type": "Feature",
                "geometry": {
                    "type": "Point",
                    "coordinates": [9.875850261761892, 57.064466311048619]
                },
                "properties": {
                    "TrackId": "c3028f545746859625b24c7b598771f5",
                    "LastObservationTS": "2019-11-08T11:59:59.5217566Z",
                    "TrackLength": 9,
                    "Speed": "41,2",
                    "AvgSpeed": "54,1",
                    "Course": 116,
                    "Direction": "SE",
                    "LastAngle": "50,2",
                    "XY": "1436, 875"
                }
            }, {
                "type": "Feature",
                "geometry": {
                    "type": "Point",
                    "coordinates": [9.80858488175855, 57.068526970280146]
                },
                "properties": {
                    "TrackId": "c4243370b937862a2ee056f4fb083ba4",
                    "LastObservationTS": "2019-11-08T11:59:59.5217566Z",
                    "TrackLength": 11,
                    "Speed": "41,2",
                    "AvgSpeed": "57,1",
                    "Course": 183,
                    "Direction": "S",
                    "LastAngle": "20",
                    "XY": "1133, 1287"
                }
            }, {
                "type": "Feature",
                "geometry": {
                    "type": "Point",
                    "coordinates": [9.8574673335606064, 57.058036610556151]
                },
                "properties": {
                    "TrackId": "ca4f392ae4597085bf2c31cf1e2d71e5",
                    "LastObservationTS": "2019-11-08T11:59:56.9999752Z",
                    "TrackLength": 16,
                    "Speed": "84,9",
                    "AvgSpeed": "63,7",
                    "Course": 102,
                    "Direction": "E",
                    "LastAngle": "-8,8",
                    "XY": "1444, 1040"
                }
            }, {
                "type": "Feature",
                "geometry": {
                    "type": "Point",
                    "coordinates": [9.8226282791086259, 57.094290882957132]
                },
                "properties": {
                    "TrackId": "d07418bad3ac199b337440335c160ff5",
                    "LastObservationTS": "2019-11-08T11:59:51.9526741Z",
                    "TrackLength": 20,
                    "Speed": "32,3",
                    "AvgSpeed": "45,4",
                    "Course": 14,
                    "Direction": "N",
                    "LastAngle": "-9,9",
                    "XY": "876, 1016"
                }
            }, {
                "type": "Feature",
                "geometry": {
                    "type": "Point",
                    "coordinates": [9.8535130797384287, 57.117183702301226]
                },
                "properties": {
                    "TrackId": "d5aab578e56effdf30d2768dc5e2a42e",
                    "LastObservationTS": "2019-11-08T11:59:59.5217566Z",
                    "TrackLength": 23,
                    "Speed": "20,6",
                    "AvgSpeed": "41,4",
                    "Course": 3,
                    "Direction": "N",
                    "LastAngle": "1,1",
                    "XY": "717, 655"
                }
            }

            ]
        };



        // getting radar information
        const radar_info = this.geojsonObject.features[0];

        const radar_coordinates_for_center = transform([radar_info.geometry.coordinates[0], radar_info.geometry.coordinates[1]], 'EPSG:4326', 'EPSG:3857');

        const radar_coordinates_for_mark = ([radar_info.geometry.coordinates[0], radar_info.geometry.coordinates[1]]);


        // preparing geojson obejct by implement transform on coordinates
        this.geojsonObject.features.map((feature) => {

            let coordinates = transform([feature.geometry.coordinates[0], feature.geometry.coordinates[1]], 'EPSG:4326', 'EPSG:3857');

            return feature.geometry.coordinates = coordinates;

        });


        //Removing Radar Information array 
        this.geojsonObject.features.shift();


        var vectorSource = new VectorSource({
            features: (new GeoJSON()).readFeatures(this.geojsonObject)
        });

        var vectorLayer = new VectorLayer({
            source: vectorSource,
            style: styleFunction
        });


        var map = new Map({
            layers: [
                new TileLayer({
                    source: new OSM()
                }),
                vectorLayer
            ],
            target: 'map',
            view: new View({
                center: radar_coordinates_for_center,
                zoom: 13,
            })
        });


        //  Adding a marker on the map that indicates Radar
        var marker = new Feature({
            geometry: new GeomPoint(
                fromLonLat(radar_coordinates_for_mark)
            ),
        });

        marker.setStyle(new Style({
            image: this.radar
        }));

        var vectorSource = new VectorSource({
            features: [marker]
        });

        var markerVectorLayer = new VectorLayer({
            source: vectorSource,
        });
        map.addLayer(markerVectorLayer);

    }



}
