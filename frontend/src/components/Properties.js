import React from "react";
import { Getter } from "../utils/custom-hooks/HitTheServer";
import { Divider, Alert } from "antd";
import toMoney from "../utils/Converters";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFire, faHome } from "@fortawesome/free-solid-svg-icons";

export default () => {
  const [{ data, isLoading, isError, error }] = Getter("properties/all", "get");

  const groupByType = (data, key) => {
    return data.reduce((obj, property) => {
      (obj[property[key]] = obj[property[key]] || []).push(property);
      return obj;
    }, {});
  };

  const sortedPropertiesObj = groupByType(data, "property_type");

  return (
    <div className="container-fluid pb-3" id="properties-main">
      {isLoading ? (
        <div>Loading</div>
      ) : (
        <>
          {isError ? (
              <div className="antd-holder"> <Alert
              message={error}
              className="antd-alert"
              closable
              type="error"
              closeText="Dismiss!"
            /></div>
          ) : (
            <>
              {Object.keys(sortedPropertiesObj).map(property_key => (
                <div className="type-devider">
                  <Divider style={{ padding: 0, margin: 0 }} orientation="left">
                    <FontAwesomeIcon icon={faFire} size="sm" color="#e25822" />{" "}
                    Popular in {property_key}
                  </Divider>
                  <ul className="row pt-3">
                    {sortedPropertiesObj[property_key]
                      .slice(0, 6)
                      .map(property => (
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
                                {property.locality} in {property.ward},{" "}
                                {property.division}
                              </span>
                              <span className="col-5" id="price">
                                Ksh. {toMoney(property.price)}
                              </span>
                            </div>
                            <a className="btn btn-lg btn-block" href="/">
                              View property details
                            </a>
                          </div>
                        </li>
                      ))}
                  </ul>
                  <a
                    className="see-all"
                    href={"/properties/".concat(property_key.toLowerCase())}
                  >
                    <span className="see-all-highlight">
                      All properties in {property_key}
                    </span>
                  </a>
                </div>
              ))}
            </>
          )}
        </>
      )}
    </div>
  );
};
