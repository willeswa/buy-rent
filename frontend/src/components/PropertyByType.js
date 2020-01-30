import React, { useState } from "react";
import { Skeleton, Alert, Input, Drawer } from "antd";
import { Getter } from "../utils/custom-hooks/HitTheServer";
import toMoney from "../utils/Converters";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarkerAlt, faWifi } from "@fortawesome/free-solid-svg-icons";
import GoogleMapReact from "google-map-react";

const { Search } = Input;
const viewPort = window.innerWidth;

const withData = Component => props => {
  const [showThisProperty, setShowThisProperty] = useState({});
  const [{ data, isLoading, error }] = Getter(props.endpoint);
  const [drawer, setDrawer] = useState(false);
  const {
    center = {
      lat: showThisProperty.latitude,
      lng: showThisProperty.longitude
    },
    zoom = 11
  } = props;

  // const showDetails = () => {
  //   setDrawer(true)
  // };

  const closeDrawer = () => {
    setDrawer(false);
  };

  const openDrawer = value => {
    setDrawer(true);
    setShowThisProperty(
      data.filter(property => parseInt(property.id) === parseInt(value))[0]
    );
  };

  return (
    <Skeleton loading={isLoading} active>
      {error.isError ? (
        <div>
          <Alert message={error.message} />
        </div>
      ) : (
        <Component
          data={data}
          state={props.state}
          drawer={drawer}
          openDrawer={value => openDrawer(value)}
          closeDrawer={closeDrawer}
          showThisProperty={showThisProperty}
          isLoading={isLoading}
          error={error}
          center={center}
          zoom={zoom}
        />
      )}
    </Skeleton>
  );
};

const daysFromToday = createdOn => {
  let date = new Date();
  let dateOfCreation = new Date(createdOn);

  let todaysMonth = String(date.getMonth() + 1).padStart(2, "0");
  let todasDay = String(date.getDate()).padStart(2, "0");
  let todaysYear = date.getFullYear();

  let today = new Date(`${todaysYear}-0${todaysMonth}-${todasDay}`);

  let daysSinceCreated = Math.round((today - dateOfCreation) / 86400193.536);

  return daysSinceCreated;
};

const Marker = () => (
 <>
 <span className="marker-effect">

 </span>
  <span className="marker">
    <FontAwesomeIcon icon={faMapMarkerAlt} color="#1D832D" size="2x" />
  </span>
 </>
);

const listCardProperties = (
  center,
  zoom,
  isLoading,
  error,
  showThisProperty,
  data,
  state,
  drawer,
  openDrawer,
  closeDrawer,
  type,
  others
) => {
  return (
    <div className="container-fluid type-container">
      <div className={drawer ? "hiddentity" : "header-strip sticky-top"}>
        <h3 className="h3">All {type}</h3>

        <Search
          placeholder="Search by area eg. Kimilili..."
          onSearch={value => console.log(value)}
          enterButton="Search"
        />
        <div className="others-btn">
          {others.map(other => (
            <a className="btn btn-sm other-btn" href={`/properties/${other}`}>
              {other.charAt(0).toUpperCase() + other.slice(1)}
            </a>
          ))}
        </div>
      </div>
      <ul className="row pt-3">
        {data.map(property => (
          <li key={property.id} className="navbar-nav card">
            <img
              src={property.image}
              alt={property.name}
              className="card-img-top img-fluid"
            />
            <div className="card-body">
              <h4 className="card-title">
                {property.title.length > 30
                  ? `${property.title.slice(0, 30)}...`
                  : property.title}
              </h4>
              <div className="row pt-2 pb-4">
                <span className="col-7">
                  <FontAwesomeIcon icon={faMapMarkerAlt} color="#1D832D" />{" "}
                  <em>
                    {property.locality} in {property.ward}, {property.division}
                  </em>
                </span>
                <span className="col-5" id="price">
                  Ksh. {toMoney(property.price)}
                </span>
              </div>
              <button
                type="button"
                value={property.id}
                onClick={e => openDrawer(e.target.value)}
                className="btn btn-lg btn-block"
              >
                View property details
              </button>
            </div>
            <Drawer
              onClose={closeDrawer}
              zIndex={2000}
              visible={drawer}
              title={
                isLoading
                  ? "Please wait! We are getting property details..."
                  : `${showThisProperty.title}`
              }
              width={viewPort < 1200 ? "100%" : "60%"}
              className={
                viewPort < 1200 ? "mobile-details-drawer" : "lg-details-drawer"
              }
            >
              <div class="card drawer-content-card">
                <div className="d-flex upper-deetail-section">
                  <div className="maps-container">
                    <GoogleMapReact
                      bootstrapURLKeys={{
                        key: "AIzaSyB_K1Lb4mVmOFlLpmABl-TVYPu7AB9ReDk"
                      }}
                      defaultCenter={center}
                      defaultZoom={zoom}
                    >
                      <Marker
                        lat={showThisProperty.latitude}
                        lng={showThisProperty.longitude}
                      />
                    </GoogleMapReact>
                  </div>
                  <img
                    src={showThisProperty.image}
                    class="card-img-top"
                    alt={showThisProperty.title}
                  />
                </div>

                <div class="card-body">
                  <div>
                    {showThisProperty.property_type === 1 ? (
                      <div>
                        <div className="property-specific-strip">
                          <span className="">
                            <em className="psem">
                              Kes&nbsp;{showThisProperty.price}
                            </em>
                            {showThisProperty.for_sale ? null : `/year`}
                          </span>

                          <span className="land-size">{`${showThisProperty.land_size} Acres`}</span>
                        </div>
                        <div className="property-specific-strip">
                          {showThisProperty.for_sale ? (
                            <span>
                              Land for sale in{" "}
                              <em className="em">
                                {property.locality}, {property.ward},{" "}
                                {property.division}
                              </em>
                            </span>
                          ) : (
                            <span>
                              Land for rent in{" "}
                              <em className="em">
                                {property.locality}, {property.ward},{" "}
                                {property.division}
                              </em>
                            </span>
                          )}
                        </div>
                      </div>
                    ) : showThisProperty.property_type === 2 ? (
                      <div>
                        <div className="property-specific-strip">
                          <span className="">
                            <em className="psem">
                              Kes&nbsp;{showThisProperty.price}
                            </em>
                            /month
                          </span>
                          <div className="non-price-spans">
                            <span className=" property-specific-btn">
                              {showThisProperty.wifi ? (
                                <FontAwesomeIcon icon={faWifi} />
                              ) : (
                                "No WiFi"
                              )}
                            </span>
                            <span className="land-size">
                              {`${showThisProperty.square_feet} Sq.`}&sup2;
                            </span>
                          </div>
                        </div>
                        <div className="property-specific-strip">
                          {showThisProperty.for_sale ? (
                            <span>
                              Office Space for sale in{" "}
                              <em className="em">
                                {property.locality}, {property.ward},{" "}
                                {property.division}
                              </em>
                            </span>
                          ) : (
                            <span>
                              Office Space to let in{" "}
                              <em className="em">
                                {property.locality}, {property.ward},{" "}
                                {property.division}
                              </em>
                            </span>
                          )}
                        </div>
                      </div>
                    ) : showThisProperty.property_type === 3 ? (
                      <div className="property-specific-strip">Rentals</div>
                    ) : showThisProperty.property_type === 4 ? (
                      <div>
                        <div className="property-specific-strip">
                          <span className="">
                            <em className="psem">
                              Kes&nbsp;{showThisProperty.price}
                            </em>
                            /month
                          </span>
                        </div>
                        <div className="property-specific-strip">
                          <span>
                            Stall to let in &nbsp;
                            <em className="em">
                              {property.locality}, {property.ward},{" "}
                              {property.division}
                            </em>
                          </span>
                        </div>
                      </div>
                    ) : (
                      <div>
                        <div className="property-specific-strip">
                          <span className="">
                            <em className="psem">
                              Kes&nbsp;{showThisProperty.price}
                            </em>
                            /sem
                          </span>
                          <div className="non-price-spans">
                            <span className=" property-specific-btn">
                              {showThisProperty.wifi ? (
                                <FontAwesomeIcon icon={faWifi} />
                              ) : (
                                "No WiFi"
                              )}
                            </span>
                            <span className=" property-specific-btn">
                              {showThisProperty.meals ? "Meals" : "No Meals"}{" "}
                            </span>
                            <span className=" property-specific-btn">
                              {showThisProperty.self_contained
                                ? "self-contained"
                                : "Shared Bathroom/Toilet"}
                            </span>
                          </div>
                        </div>
                        <div className="property-specific-strip">
                          {
                            <span>
                              Hostels for rent in{" "}
                              <em className="em">
                                {property.locality}, {property.ward},{" "}
                                {property.division}
                              </em>
                            </span>
                          }
                        </div>
                      </div>
                    )}
                  </div>
                  <p className="pt-2">{showThisProperty.description}</p>
                  <div className="d-flex details-strip">
                    <button className="btn btn-sm other-btn for-sale-btn">
                      <em>
                        {showThisProperty.for_sale ? "For Sale" : "For Lease"}
                      </em>
                    </button>
                    <span className="last-posted">
                      <em>
                        Posted &nbsp;
                        {`${daysFromToday(
                          showThisProperty.created_at
                        )} days ago`}
                      </em>
                    </span>
                  </div>
                  <div>
                    {showThisProperty.owner ? (
                      <div>
                        <a
                          className="btn rounded-0 email-btn"
                          href={`mailto:${
                            showThisProperty.owner.email
                          }?Subject=I%20am20%intrested%20in%20${showThisProperty.title.slice(
                            0,
                            20
                          )}`}
                          target="_top"
                        >
                          Email Owner
                        </a>
                        <a
                          className="btn rounded-0 call-btn"
                          href={`tel:${showThisProperty.owner.phonenumber}`}
                        >
                          Call Owner
                        </a>
                      </div>
                    ) : null}
                  </div>
                </div>
              </div>
            </Drawer>
          </li>
        ))}
      </ul>
    </div>
  );
};

const LandComponent = ({
  center,
  zoom,
  isLoading,
  error,
  showThisProperty,
  data,
  drawer,
  openDrawer,
  closeDrawer,
  state
}) =>
  listCardProperties(
    center,
    zoom,
    isLoading,
    error,
    showThisProperty,
    data,
    state,
    drawer,
    openDrawer,
    closeDrawer,
    "Lands",
    ["hostels", "stalls", "offices", "rentals"]
  );

const HostelComponent = ({
  center,
  zoom,
  isLoading,
  error,
  showThisProperty,
  data,

  drawer,
  openDrawer,
  closeDrawer,
  state
}) =>
  listCardProperties(
    center,
    zoom,
    isLoading,
    error,
    showThisProperty,
    data,
    state,
    drawer,
    openDrawer,
    closeDrawer,
    "Hostels",
    ["lands", "stalls", "offices", "rentals"]
  );

const StallComponent = ({
  center,
  zoom,
  isLoading,
  error,
  showThisProperty,
  data,

  drawer,
  openDrawer,
  closeDrawer,
  state
}) =>
  listCardProperties(
    center,
    zoom,
    isLoading,
    error,
    showThisProperty,
    data,
    state,
    drawer,
    openDrawer,
    closeDrawer,
    "Stalls",
    ["lands", "hostels", "offices", "rentals"]
  );

const OfficeComponent = ({
  center,
  zoom,
  isLoading,
  error,
  showThisProperty,
  data,
  drawer,
  openDrawer,
  closeDrawer,
  state
}) =>
  listCardProperties(
    center,
    zoom,
    isLoading,
    error,
    showThisProperty,
    data,
    state,
    drawer,
    openDrawer,
    closeDrawer,
    "Offices",
    ["lands", "hostels", "stalls", "rentals"]
  );

const RentalComponent = ({
  center,
  zoom,
  isLoading,
  error,
  showThisProperty,
  data,
  drawer,
  openDrawer,
  closeDrawer,
  state
}) =>
  listCardProperties(
    center,
    zoom,
    isLoading,
    error,
    showThisProperty,
    data,
    state,
    drawer,
    openDrawer,
    closeDrawer,
    "Rentals",
    ["lands", "hostels", "stalls", "offices"]
  );

export const Rental = withData(RentalComponent);
export const Land = withData(LandComponent);
export const Hostel = withData(HostelComponent);
export const Stall = withData(StallComponent);
export const Office = withData(OfficeComponent);
