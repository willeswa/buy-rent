import React, { useState, useEffect } from "react";
import axios from "axios";

import { Card, Empty, Drawer, Form, Input, Select } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";





const basePropertyUrl = "http://127.0.0.1:8000/api/properties/";

const divisionsData = [
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
const wardData = {
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


const {Option} = Select;
const {TextArea } = Input;
const {InputNumber} = Input;

export default props => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [drawer, setOpenDrawer] = useState(false);
  const [propertyUrl, setPropertyUrl] = useState(basePropertyUrl);
  const [isError, setIsError] = useState(false);
  const [propertyData, setPropertyData] = useState({});
  const [submit, setSubmit] = useState(false);
  const [propertySize, setPropertySize] = useState("");

  const [divisions, setDivision] = useState(wardData[divisionsData[0]]);
  const [ward, setWard] = useState(wardData[divisionsData[0]][0]);
  // const [propertyType, setPropertyType] = useState('');

  const baseUrl = "http://127.0.0.1:8000/api/auth";

  const user_id = props.match.params.id;
  const viewPort = window.innerWidth;

  const token = JSON.parse(localStorage.getItem("token"));

  let headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token.access}`
  };

  const openDrawer = () => {
    setOpenDrawer(true);
  };

  const closeDrawer = () => {
    setOpenDrawer(false);
  };

  const handleSelectChange = value => {
    setPropertyUrl(basePropertyUrl.concat(value));
    setPropertyData({ ...propertyData, property_type: 1 });
  };

  const handleDivisionChange = value => {
    setDivision(wardData[value]);
    setWard(wardData[value][0]);
  };

  const handleWardChange = value => {
    setWard(value);
  };

  const onSubmit = value => {
    console.log("some", value);
  };

  const handleSubmit = value => {
    console.log(value);
  };



  console.log(propertySize);

  useEffect(() => {
    setIsError(false);
    const postProperty = async () => {
      try {
        const result = await axios.post(
          propertyUrl,
          { headers: headers },
          propertyData
        );
        console.log(">>> property", result.data);
      } catch (error) {
        console.log(">>>propert error", error);
      }
    };
    postProperty();
  }, [submit]);

  useEffect(() => {
    const getThisUser = async () => {
      setLoading(true);

      try {
        const result = await axios(baseUrl.concat("/users/", user_id));

        setUser(result.data);
        setLoading(false);
        console.log("here1", user);
      } catch (error) {
        console.log("error", error.message);
      }
    };
    getThisUser();
  }, []);

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
            {/* <Meta description={location.state.user.email} /> */}
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
    
        </div>
      </Drawer>
    </div>
  );
};
