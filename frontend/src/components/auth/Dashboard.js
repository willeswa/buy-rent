import React, { useState } from "react";
import Geocode from "react-geocode";


import { Card, Empty, Drawer, List, Switch, Alert } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { PropertySetter } from "../../utils/custom-hooks/HitTheServer";

Geocode.setApiKey("AIzaSyB_K1Lb4mVmOFlLpmABl-TVYPu7AB9ReDk");

const provinceData = [
  "Elgon",
  "Kanduyi",
  "Sirisia",
  "Kabuchai",
  "Bumula",
  "WebuyeEast",
  "WebuyeWest",
  "Kimilili",
  "Tongaren"
];
const cityData = {
  Kanduyi: [
    "BukembeWest",
    "BukembeEast",
    "Township",
    "Khalaba",
    "Musikoma",
    "EastSanagalo",
    "Marakatu",
    "Tuuti",
    "WestSangalo"
  ],
  Sirisia: ["Namwela", "MalakisiSouth", "Kulisiru", "Lwandanyi"],
  Bumula: ["Bumula", "Khasoko", "Kabula", "Kimaeti", "SouthBukusu", "Siboti"],
  Elgon: ["Cheptais", "Chesikaki", "Chepyuk", "Kapkateny", "Kaptama", "Elgon"],
  Kabuchai: ["Chwele", "WestNalondo", "BwakeLuuya", "Mukuyuni", "SouthBukusu"],
  WebuyeEast: ["Mihuu", "Ndivisi", "Maraka"],
  WebuyeWest: ["Sitikho", "Matulo", "Bokoli"],
  Kimilili: ["Kibingei", "Kimilili", "Maeni", "Kamukuywa"],
  Tongaren: [
    "Mbakalo",
    "Kabuyefwe",
    "Milima",
    "NdaluTabani",
    "Tongaren",
    "SoysambuMitua"
  ]
};

const propertyTypes = ["Land", "Hostel", "Rental", "Stall", "Office"];
const baseUrl = "https://bungomaplus.herokuapp.com/api/properties/";

const { Meta } = Card;

export default ({ state }) => {
  const viewPort = window.innerWidth;

  const [divisions, setDivisions] = useState(cityData[provinceData[0]]);
  const [ward, setWard] = useState(cityData[provinceData[0]][0]);
  const [propertyMeta, setPropertyMeta] = useState({});
  const [propertyData, setPropertyData] = useState({
    division: cityData[provinceData[0]],
    ward: ward,
    title: "",
    description: "",
    locality: "Nambwa Area",
    image:
      "https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=666&q=80"
  });
  const [propertyType, setPropertyType] = useState("");
  const [url, setTypeUrl] = useState(baseUrl);

  const [
    setOpenDrawer,
    drawer,
    isLoading,
    error,
    setUrl,
    setProperty,
    setSubmit
  ] = PropertySetter();

  const openDrawer = () => {
    setOpenDrawer(true);
    setPropertyData({ ...propertyData, owner_id: state.user.user.id });
  };

  const closeDrawer = () => {
    setOpenDrawer(false);
  };

  const handleProvinceChange = e => {
    let value = e.target.value;
    setDivisions(cityData[value]);
    setWard(cityData[value][0]);

 

    Geocode.fromAddress(`${ward}+${value}`).then(
      response => {
        const { lat, lng } = response.results[0].geometry.location;

        setPropertyData({
          ...propertyData,
          division: value,
          longitude: lng,
          latitude: lat
        });
      },
      error => {

        setPropertyData({
          ...propertyData,
          division: value,
          longitude: 34.5777565,
          latitude: 0.5949997
        });
      }
    );
    
  };

  const onwardChange = e => {
    let value = e.target.value;
    setWard(value);
    setPropertyData({ ...propertyData, ward: value });
  };

  const handlePriceNumberChange = e => {
    let value = e.target.value;
    setPropertyData({ ...propertyData, price: value });
  };

  const handleOfficeSpaceChange = e => {
    let value = e.target.value;
    setPropertyData({ ...propertyData, square_feet: value });
  };

  const handleAcreageChange = e => {
    let value = e.target.value;
    setPropertyData({ ...propertyData, land_size: value });
  };

  const handleInputChange = e => {
    let id = e.target.id;
    let value = e.target.value;
    switch (id) {
      case "title":
        return setPropertyData({ ...propertyData, title: value });

      case "description":
        return setPropertyData({ ...propertyData, description: value });
      default:
        return;
    }
  };

  const handleRoomChange = e => {
    let value = e.target.value;
    setPropertyData({ ...propertyData, rooms: value });
  };

  const toggleExtraFieldsFor = propertyType => {
    document.getElementById(propertyType).classList.remove("hiddentity");
    document
      .getElementById(propertyType)
      .classList.add("showEntity", propertyType);
    document.querySelectorAll("div.showEntity").forEach(element => {
      if (!Array.from(element.classList).includes(propertyType)) {
        element.classList.remove("showEntity");
        element.classList.add("hiddentity");
      }
    });
  };

  const onPropertyChange = e => {
    let endpoint;
    let value = e.target.value;

    endpoint = `${value.toLowerCase()}`;
    setTypeUrl(`${baseUrl}${endpoint}s/`);
    setPropertyType(value);

    if (value === "Land") {
      setPropertyData({ ...propertyData, property_type: 1 });
    } else if (value === "Office") {
      setPropertyData({ ...propertyData, property_type: 2 });
    } else if (value === "Rental") {
      setPropertyData({ ...propertyData, property_type: 3 });
    } else if (value === "Stall") {
      setPropertyData({ ...propertyData, property_type: 4 });
    } else {
      setPropertyData({ ...propertyData, property_type: 5 });
    }

    switch (value) {
      case "Land":
        setPropertyMeta({});
        toggleExtraFieldsFor("land");
        break;
      case "Rental":
        setPropertyMeta({});
        toggleExtraFieldsFor("rental");
        break;
      case "Office":
        setPropertyMeta({});
        toggleExtraFieldsFor("office");
        break;
      case "Stall":
        setPropertyMeta({});
        toggleExtraFieldsFor("stall");
        break;
      case "Hostel":
        setPropertyMeta({});
        toggleExtraFieldsFor("hostel");
        break;
      default:
        return;
    }
  };

  const forsaleSwitch = checked => {
    setPropertyData({ ...propertyData, for_sale: checked });
  };

  const cooksSwitch = checked => {
    setPropertyData({ ...propertyData, meals: checked });
  };

  const haswaterSwitch = checked => {
    setPropertyData({ ...propertyData, water: checked });
  };

  const isgenderExSwitch = checked => {
    setPropertyData({ ...propertyData, gender_exclusive: checked });
  };

  const isselfContainedSwitch = checked => {
    setPropertyData({ ...propertyData, self_contained: checked });
  };

  const haswifiSwitch = checked => {
    setPropertyData({ ...propertyData, wifi: checked });
  };

  console.log(propertyData, url);

  return (
    <div class="container dashboard-container">
      <div class="row">
        <div class="col-md-12">
          
          <Empty
            className="empty"
            image="https://gw.alipayobjects.com/mdn/miniapp_social/afts/img/A*pevERLJC9v0AAAAAAAAAAABjAQAAAQ/original"
            imageStyle={{
              height: 60
            }}
            description={<span>Your properties will show here</span>}
          >
            <button type="button" className="btn btn-sm" onClick={openDrawer}>
              <FontAwesomeIcon icon={faPlus} /> Add Property
            </button>
          </Empty>
        </div>
      </div>
      <Drawer
        zIndex={2000}
        title={
          isLoading
            ? `Please wait. We are creating your ${propertyType}...`
            : "New Property"
        }
        width={viewPort < 1200 ? "100%" : "60%"}
        onClose={closeDrawer}
        visible={drawer}
      >
        <div>
          {error.isError ? (
            <div className="antd-holder">
              <Alert
                message={error.message}
                className="antd-alert"
                closable
                type="error"
                closeText="Dismiss!"
              />
            </div>
          ) : (
            <div></div>
          )}
          <form
            name="newProperty"
            className="pb-5"
            onSubmit={event => {
              event.preventDefault();
              setUrl(`${url}`);
              setProperty(propertyData);
              setSubmit(true);
            }}
          >
            <div className="form-row">
              <div className="form-group col-md-6">
                <label>Title: </label>
                <input
                  className="form-control form-control-sm"
                  required
                  placeholder="eg. Fertile one acre for farming.."
                  id="title"
                  onChange={e => handleInputChange(e)}
                  name="title"
                />
              </div>
              <div className=" form-group col-md-2">
                <label>Constituency:</label>
                <select
                  onChange={handleProvinceChange}
                  class="form-control form-control-sm"
                  name="division"
                >
                  <option disabled selected>
                    -- select --
                  </option>
                  {provinceData.map(province => (
                    <option key={province}>{province}</option>
                  ))}
                </select>
              </div>
              <div className="form-group col-md-2">
                <label>Ward: </label>
                <select
                  name="ward"
                  value={ward}
                  onChange={onwardChange}
                  class="form-control form-control-sm"
                >
                  <option disabled selected>
                    -- select --
                  </option>
                  {divisions.map(city => (
                    <option key={city}>{city}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="form-row">
              <div className="form-group col-md-6">
                <label>Description: </label>
                <textarea
                  name="description"
                  required
                  placeholder="Enter a detailed description of your property"
                  id="description"
                  onChange={e => handleInputChange(e)}
                  rows={4}
                  className="form-control form-control-sm"
                ></textarea>
              </div>
              <div className=" form-group col-md-2">
                <label>Price:&nbsp;&nbsp;</label>
                <div class="input-group input-group-sm">
                  <div class="input-group-prepend">
                    <div class="input-group-text">Kes</div>
                  </div>
                  <input
                    name="price"
                    type="number"
                    class="form-control form-control-sm"
                    id="inlineFormInputGroup"
                    onChange={handlePriceNumberChange}
                    min={100}
                    step={100}
                    required
                  />
                </div>
              </div>

              <div className="form-group col-md-2">
                <label>Property Type:&nbsp;&nbsp;</label>
                <select
                  name="type"
                  class="form-control form-control-sm"
                  onChange={onPropertyChange}
                >
                  <option id="firsoption" disabled selected>
                    -- select --
                  </option>
                  {propertyTypes.map(type => (
                    <option key={type}>{type}</option>
                  ))}
                </select>
              </div>
            </div>
            <div className="form-row hiddentity" id="land">
              <div className="form-group col-md-2">
                <label>Leasing or Seling:&nbsp;</label>
                <Switch
                  checkedChildren="Leasing"
                  unCheckedChildren="Selling"
                  onChange={forsaleSwitch}
                />
              </div>
              <div className=" form-group col-md-2">
                <label>Size of Land:&nbsp;&nbsp;</label>
                <div class="input-group input-group-sm">
                  <div class="input-group-prepend">
                    <div class="input-group-text">Acres</div>
                  </div>
                  <input
                    name="land_size"
                    type="number"
                    class="form-control form-control-sm"
                    id="inlineFormInputGroup"
                    onChange={handleAcreageChange}
                    min={0}
                    step={0.1}
                  />
                </div>
              </div>
            </div>
            <div className="form-row hiddentity" id="rental">
              <div className="form-group col-md-2">
                <label>Water Available?&nbsp;&nbsp;</label>
                <Switch
                  checkedChildren="No"
                  unCheckedChildren="Yes"
                  onChange={haswaterSwitch}
                />
              </div>
              <div className=" form-group col-md-2">
                <label>Rooms:&nbsp;&nbsp;</label>

                <div class="input-group input-group-sm">
                  <div class="input-group-prepend">
                    <div class="input-group-text">Rooms</div>
                  </div>
                  <input
                    name="rooms"
                    type="number"
                    class="form-control form-control-sm"
                    id="inlineFormInputGroup"
                    onChange={handleRoomChange}
                    min={1}
                    step={1}
                  />
                </div>
              </div>
            </div>
            <div className="form-row hiddentity" id="office">
              <div className=" form-group col-md-3">
                <label>Square Feet:&nbsp;&nbsp;</label>

                <div class="input-group input-group-sm">
                  <div class="input-group-prepend">
                    <div class="input-group-text">Square Feet</div>
                  </div>
                  <input
                    name="land_size"
                    type="number"
                    class="form-control form-control-sm"
                    id="inlineFormInputGroup"
                    onChange={handleOfficeSpaceChange}
                    min={1}
                    step={0.1}
                  />
                </div>
              </div>
              <div className="form-group col-md-2">
                <label>WiFi Avaialble? &nbsp;&nbsp;</label>
                <Switch
                  checkedChildren="No"
                  unCheckedChildren="Yes"
                  onChange={haswifiSwitch}
                />
              </div>
            </div>
            <div className="form-row hiddentity" id="hostel">
              <div className="form-group col-md-2">
                <label>Gender Exclusive?&nbsp;</label>
                <Switch
                  checkedChildren="No"
                  unCheckedChildren="Yes"
                  onChange={isgenderExSwitch}
                />
              </div>
              <div className="form-group col-md-2">
                <label>WiFi Avaialble?&nbsp;&nbsp;</label>
                <Switch
                  checkedChildren="No"
                  unCheckedChildren="Yes"
                  onChange={haswifiSwitch}
                />
              </div>
              <div className="form-group col-md-2">
                <label>Meals Available?:&nbsp;&nbsp;</label>
                <Switch
                  checkedChildren="No"
                  unCheckedChildren="Yes"
                  onChange={cooksSwitch}
                />
              </div>
              <div className="form-group col-md-2">
                <label>Self Contained?&nbsp;&nbsp;</label>
                <Switch
                  checkedChildren="No"
                  unCheckedChildren="Yes"
                  onChange={isselfContainedSwitch}
                />
              </div>
            </div>
            <div className="form-row hiddentity" id="stall"></div>
            <button type="submit" value="Submit" className="btn btn-sm">
              {isLoading ? "Creating..." : "Create Property"}
            </button>
          </form>
        </div>
      </Drawer>
    </div>
  );
};
