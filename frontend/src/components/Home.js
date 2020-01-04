import React, { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import TextLoop from "react-text-loop";
import toMoney from "../utils/Converters";

export default () => {
  const [propertyTypes, setTypes] = useState([]);
  const [properties, setProperties] = useState([]);

  const baseUrl = "http://127.0.0.1:8000/api/properties";

  useEffect(() => {
    const fetchPropertyTypes = async () => {
      const result = await axios(baseUrl + "/types/");
      setTypes(result.data);
    };

    fetchPropertyTypes();
  }, []);

  useEffect(() => {
    const fetchProperties = async () => {
      const result = await axios(baseUrl + "/all");
      setProperties(result.data);
      console.log(result.data);
    };
    fetchProperties();
  }, []);

  return (
    <div>
      <div className="jumbotron rounded-0">
        <h3 className="display-3 pb-4">
          Rent or Sell properties in Bungoma County easily.
        </h3>
        <h2 className="display-4">
          <TextLoop
            interval={2000}
            children={[
              "Buy or Lease Land.",
              "Find houses to Rent.",
              "Find Hostels.",
              "Search for Stalls and Shops.",
              "Lease or rent Offices."
            ]}
          />
        </h2>
        <p className="lead pt-4 pb-4">
          We help clients circumnavigate brokers and help property owners
          maximize profits from their properties.
        </p>
        <div className="inline-block" id="inline-block">
          <button className="btn btn-lg rounded-0">I AM LOOKING</button>{" "}
          <button className="btn btn-lg ml-3 rounded-0">I AM SELLING</button>
        </div>
      </div>
      <div className="container">
        <h4 className="h5">Propety Categories</h4>

        <ul className="row no-gutters pl-3">
          {propertyTypes.map(type => (
            <li key={type.id} className="navbar-nav card m-2">
              <img
                src={type.image}
                alt={type.name}
                className="card-img-top img-fluid"
              />
              <div className="card-body">
                <h4 className="card-title">{type.name}</h4>
                <a
                  className="btn btn-lg btn-block"
                  id="homeTypeButton"
                  href={type.name.toLowerCase()}
                >
                  All {type.name}
                </a>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className="container-fluid mt-5 pb-3">
        <a className="see-all" href="/properties">
          See all properties <FontAwesomeIcon icon={faChevronRight} />{" "}
        </a>

        <ul className="row pt-5">
          {properties.slice(0, 3).map(property => (
            <li key={property.id} className="navbar-nav card">
              <img
                src={property.image}
                alt={property.name}
                className="card-img-top img-fluid"
              />
              <div className="card-body">
                <h4 className="card-title">{property.title}</h4>
                <div className="row pt-2 pb-4">
                  <span className="col-7">
                    {property.locality} in {property.ward}, {property.division}
                  </span>
                  <span className="col-5 price">
                    Ksh. {toMoney(property.price)}
                  </span>
                </div>
                <a className="btn btn-lg btn-block">See this property</a>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className="container how-it-works">
        <h4 className="h5" id="h5">
          How it Works
        </h4>
        <div className="row">
          <div className="card">
            <img src="https://res.cloudinary.com/ddfufqlbx/image/upload/v1578100802/phonehand.png" />
            <div className="card-body">
              <h4 className="h5">Post your property on the platform</h4>
              <p className="card-text">
                Use your phone to tell us about your property. Our platform will
                connect you with thousands of customers.
              </p>
            </div>
          </div>
          <div className="card">
            <img src="https://res.cloudinary.com/ddfufqlbx/image/upload/v1578100649/crowd.png" />
            <div className="card-body">
              <h4 className="h5">Clients come to you!</h4>
              <p className="card-text">
                Get potential customers within your locality without going
                through layers of brokers and fake promises!
              </p>
            </div>
          </div>
          <div className="card">
            <img src="https://res.cloudinary.com/ddfufqlbx/image/upload/v1578098885/deal-icon.png" />
            <div className="card-body">
              <h4 className="h5">Get a good deal</h4>
              <p className="card-text">
                You don't have to share your money with brokers anymore. Which
                means you get more value for your property.
              </p>
            </div>
          </div>
        </div>
        <div className="row list-now-strip">
          <h1 className="col-10">
            <span className="d-block paragraph">
              Thousands of Kenyans are looking for property to buy/rent in Bungoma
              County
            </span>
            <span className="d-block h2">Lease or Sell Propety in Bungoma County</span>
          </h1>{" "}
          <button className="btn" id="strip-button">List your Property</button>
        </div>
      </div>
    </div>
  );
};
