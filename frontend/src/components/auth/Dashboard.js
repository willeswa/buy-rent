import React, { useState } from "react";

import {
  Card,
  Empty,
  Drawer,
  InputNumber,
  Input,
  Select,
  Switch,
  Form,
  Alert
} from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faWifi } from "@fortawesome/free-solid-svg-icons";
import { Setter } from "../../utils/custom-hooks/HitTheServer";

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
const baseUrl = "http://127.0.0.1:8000/api/auth/properties/";

const { Meta } = Card;
const { Option } = Select;
const { TextArea } = Input;

export default ({ state }) => {
  const [drawer, setOpenDrawer] = useState(false);

  const viewPort = window.innerWidth;

  const [divisions, setDivisions] = useState(cityData[provinceData[0]]);
  const [ward, setWard] = useState(cityData[provinceData[0]][0]);
  const [propertyMeta, setPropertyMeta] = useState({});
  const [propertyData, setPropertyData] = useState({
    division: "",
    ward: "",
    title: "",
    description: "",
    locality: "Nambwa Area"
  });
  const [propertyType, setPropertyType] = useState("");
  const [url, setTypeUrl] = useState(baseUrl);

  const [
    isLoading,
    error,
    setEntry,
    setUrl,
    setSetterData,
    setSubmit
  ] = Setter();

  const openDrawer = () => {
    setOpenDrawer(true);
  };

  const closeDrawer = () => {
    setOpenDrawer(false);
  };

  const handleProvinceChange = value => {
    setDivisions(cityData[value]);
    setPropertyData({ ...propertyData, division: value });
    setWard(cityData[value][0]);
  };

  const onwardChange = value => {
    setWard(value);
    setPropertyData({ ...propertyData, ward: value });
  };

  const handlePriceNumberChange = value => {
    setPropertyData({ ...propertyData, price: value });
  };

  const handleOfficeSpaceChange = value => {
    setPropertyData({ ...propertyData, squre_feet: value });
  };

  const handleAcreageChange = value => {
    setPropertyData({ ...propertyData, size: value });
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

  const handleRoomChange = value => {
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

  const onPropertyChange = value => {
    let endpoint;
    setPropertyType(value);
    endpoint = `${value.toLowerCase()}`;
    setPropertyData({ ...propertyData, property_type: value.toLowerCase() });
    setTypeUrl(`${baseUrl}${endpoint}s/`);

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
        <div class="col-lg-4">
          <Card
            className="col-lg-12 profile-card"
            style={{ width: 250 }}
            cover={
              <img
                alt="profile"
                src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
                className="img-thumbnail"
                style={{
                  height: 200
                }}
              />
            }
          >
            <Meta description={state.user.user.email} />
          </Card>
        </div>
        <div class="col-lg-8 ">
          <Empty
            className="empty"
            image="https://gw.alipayobjects.com/mdn/miniapp_social/afts/img/A*pevERLJC9v0AAAAAAAAAAABjAQAAAQ/original"
            imageStyle={{
              height: 60
            }}
            description={<span>Your properties will show here</span>}
          >
            <button className="btn btn-sm" onClick={openDrawer}>
              <FontAwesomeIcon icon={faPlus} /> Add Property
            </button>
          </Empty>
        </div>
      </div>
      <Drawer
        title="New Property"
        width={viewPort < 1200 ? "100%" : "60%"}
        onClose={closeDrawer}
        visible={drawer}
        className={
          viewPort < 1200 ? "mobile-new-property-form" : "new-property-form"
        }
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
              <p>{console.log('kuna error hapa')}</p>
            </div>
          ) : (
            <div>{console.log('huko kuko fiti')}</div>
          )}
          <form
            className="pb-5"
            onSubmit={event => {
              event.preventDefault();
              setEntry("property");
              setUrl(`${url}`);
              setSetterData(propertyData);
              setSubmit(true);
            }}
          >
            <div className="form-row">
              <div className="form-group col-md-6">
                <label>Title: </label>
                <Input
                  placeholder="eg. Fertile one acre for farming.."
                  id="title"
                  onChange={e => handleInputChange(e)}
                />
              </div>
              <div className=" form-group col-md-2">
                <label>Constituency:</label>
                <Select
                  defaultValue={provinceData[0]}
                  style={{ width: `${100}%` }}
                  onChange={handleProvinceChange}
                >
                  {provinceData.map(province => (
                    <Option key={province}>{province}</Option>
                  ))}
                </Select>
              </div>
              <div className="form-group col-md-2">
                <label>Ward: </label>
                <Select
                  style={{ width: `${100}%` }}
                  value={ward}
                  onChange={onwardChange}
                >
                  {divisions.map(city => (
                    <Option key={city}>{city}</Option>
                  ))}
                </Select>
              </div>
            </div>
            <div className="form-row">
              <div className="form-group col-md-6">
                <label>Description: </label>
                <TextArea
                  placeholder="Enter a detailed description of your property"
                  id="description"
                  onChange={e => handleInputChange(e)}
                  rows={4}
                />
              </div>
              <div className=" form-group col-md-2">
                <label>Price:&nbsp;&nbsp;</label>
                <InputNumber
                  defaultValue={1}
                  formatter={value =>
                    `Ksh ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                  }
                  parser={value => value.replace(/\w+\s?|(,*)/g, "")}
                  onChange={handlePriceNumberChange}
                  min={100}
                  step={100.5}
                />
              </div>

              <div className="form-group col-md-2">
                <label>Property Type:&nbsp;&nbsp;</label>
                <Select
                  style={{ width: `${100}%` }}
                  value={propertyType}
                  onChange={onPropertyChange}
                >
                  {propertyTypes.map(type => (
                    <Option key={type}>{type}</Option>
                  ))}
                </Select>
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
              <div className=" form-group col-md-3">
                <label>Size of the Land:&nbsp;&nbsp;</label>
                <InputNumber
                  defaultValue={1}
                  formatter={value =>
                    `Acre ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                  }
                  parser={value => value.replace(/\w+\s?|(,*)/g, "")}
                  onChange={handleAcreageChange}
                  min={0}
                  step={0.1}
                />
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
                <InputNumber
                  defaultValue={1}
                  formatter={value =>
                    `Rooms ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                  }
                  parser={value => value.replace(/\w+\s?|(,*)/g, "")}
                  onChange={handleRoomChange}
                  min={1}
                  step={1}
                />
              </div>
            </div>
            <div className="form-row hiddentity" id="office">
              <div className=" form-group col-md-2">
                <label>Square Feet:&nbsp;&nbsp;</label>
                <InputNumber
                  id="square_feet"
                  defaultValue={1}
                  formatter={value =>
                    `Sq ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                  }
                  parser={value => value.replace(/\w+\s?|(,*)/g, "")}
                  onChange={handleOfficeSpaceChange}
                  min={1}
                  step={0.5}
                />
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
              Create Property
            </button>
          </form>
        </div>
      </Drawer>
    </div>
  );
};
