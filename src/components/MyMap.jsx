import React, { Component } from "react";
import { MapContainer, GeoJSON } from "react-leaflet";
import { Navbar, Nav, Card } from "react-bootstrap";
import ReactDOMServer from "react-dom/server";
import mapData from "../data/countries.json";
import "leaflet/dist/leaflet.css";
import "./MyMap.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "../App.css";

class MyMap extends Component {
    state = {};

    countryStyle = {
        fillColor: "#192535",
        fillOpacity: "0.75",
        color: "darkgrey",
        weight: "1",
    };

    onEachCountry = (country, layer) => {
        const countryName = country.properties.ADMIN;
        const countryISOCode = country.properties.ISO_A3;

        layer.bindPopup(
            ReactDOMServer.renderToString(
                <html>
                    <div>
                        {/* <p>{countryISOCode}</p>
                        <button className="button">
                            <strong>{countryName}</strong>
                        </button> */}
                        <a
                            href="/"
                            target="_blank"
                            style={{
                                textDecoration: "none",
                                color: "white",
                            }}
                        >
                            <strong style={{}}>{countryName}</strong>
                        </a>
                    </div>
                </html>
                // <div
                //     style={{
                //         marginTop: "-20px",
                //         marginBottom: "-15px",
                //         marginLeft: "-20px",
                //         marginRight: "-20.5px",
                //         width: "30px",
                //         height: "30px",
                //     }}
                // >
                //     <Card
                //         bg="danger"
                //         text="white"
                //         border="danger"
                //         className="mb-2"
                //         style={{ width: "auto" }}
                //     >
                //         <Card.Body>
                //             <Card.Title></Card.Title>
                //             <Card.Text>
                //                 <b>{countryName}</b>
                //                 <p>ISO Code: {countryISOCode}</p>
                //             </Card.Text>
                //         </Card.Body>
                //     </Card>
                // </div>
            )
        );
        layer.on({
            mouseover: (event) => {
                event.target.setStyle({
                    fillColor: "darkslategrey",
                    fillOpacity: "0.9",
                    color: "darkgrey",
                    weight: "1",
                    transition: "0.2s",
                });
            },
        });
        layer.on({
            mouseout: (event) => {
                event.target.setStyle({
                    fillColor: "#192535",
                    fillOpacity: "0.75",
                    color: "darkgrey",
                    weight: "1",
                    transition: "0.2s",
                });
            },
        });
        layer.on({
            click: () => {
                console.log(countryName, countryISOCode);
            },
        });
    };

    render() {
        return (
            <div>
                <Navbar bg="dark" variant="dark">
                    <Navbar.Brand href="#home">
                        <img
                            alt="logo"
                            src="https://hirefortalent.ca/images/core/covid-19_tool/icon-tool-112x.png"
                            width="30px"
                            height="30px"
                            style={{
                                verticalAlign: "middle",
                            }}
                            className="d-inline-block align-top App-logo"
                        />{" "}
                        COVIDSTATS
                    </Navbar.Brand>
                    <Nav className="mr-auto"></Nav>
                    {/* <Form inline>
                        <FormControl
                            type="text"
                            placeholder="Country"
                            className="mr-sm-2"
                        />
                        <Button variant="outline-secondary">Search</Button>
                    </Form> */}
                </Navbar>

                <MapContainer
                    style={{ height: "90vh" }}
                    zoom={2}
                    center={[50, 0]}
                    scrollWheelZoom={false}
                >
                    <GeoJSON
                        style={this.countryStyle}
                        data={mapData.features}
                        onEachFeature={this.onEachCountry}
                    />
                </MapContainer>

                <Card className="text-center" bg="dark" variant="dark">
                    <Card.Body>
                        <Card.Text style={{ color: "white" }}>
                            Content and information provided by{" "}
                            <a href="https://disease.sh/">
                                disease.sh - Open Disease Data API
                            </a>
                        </Card.Text>
                    </Card.Body>
                </Card>
            </div>
        );
    }
}

export default MyMap;
