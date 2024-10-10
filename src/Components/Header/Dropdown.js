import { useEffect, useRef, useState } from "react";
import "./Dropdown.css";
import { VscChevronDown } from "react-icons/vsc";
import { RiEqualizerFill } from "react-icons/ri";
import { handleAddQueryFilters } from "../../set.query";

const Dropdown = ({ setFilterState, filterState }) => {
  const [toggle, setToggle] = useState(false);
  const [subtoggle1, setSubToggle1] = useState(false);
  const [subtoggle2, setSubToggle2] = useState(false);
  const dropdownRef = useRef(null);
  const dropdownRef1 = useRef(null);
  const dropdownRef2 = useRef(null);
  const grouping_options = ["Status", "User", "Priority"];
  const ordering_options = ["Priority", "Title"];
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef?.current &&
        !dropdownRef?.current.contains(event.target)
      ) {
        setToggle(false);
        setSubToggle1(false);
        setSubToggle2(false);
      }
      if (
        dropdownRef1?.current &&
        !dropdownRef1?.current.contains(event.target)
      ) {
        setSubToggle1(false);
      }
      if (
        dropdownRef2?.current &&
        !dropdownRef2?.current.contains(event.target)
      ) {
        setSubToggle2(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="dropdown" ref={dropdownRef}>
      <button type="button" onClick={() => setToggle(!toggle)}>
        <RiEqualizerFill /> Display <VscChevronDown />
        <i className="fa-solid fa-chevron-down"></i>
      </button>
      {toggle && (
        <div className="dropdown-content">
          <div>
            <p>Grouping</p>{" "}
            <div className="subdropdown" ref={dropdownRef1}>
              <button
                type="button"
                onClick={() => {
                  setSubToggle1(!subtoggle1);
                  setSubToggle2(false);
                }}
              >
                {filterState?.grouping} <VscChevronDown />
              </button>
              {subtoggle1 && (
                <div className="subcontent">
                  <ul>
                    {grouping_options.map((g, i) => {
                      return (
                        <li
                          key={i}
                          onClick={() => {
                            setFilterState((prevFilterState) => ({
                              ...prevFilterState,
                              grouping: g,
                            }));
                            setSubToggle1(false);
                          }}
                        >
                          {g}
                        </li>
                      );
                    })}
                  </ul>
                </div>
              )}
            </div>
          </div>
          <div>
            <p>Ordering</p>{" "}
            <div className="subdropdown" ref={dropdownRef2}>
              <button
                type="button"
                onClick={() => {
                  setSubToggle2(!subtoggle2);
                  setSubToggle1(false);
                }}
              >
                {filterState?.ordering} <VscChevronDown />
              </button>
              {subtoggle2 && (
                <div className="subcontent">
                  <ul>
                    {ordering_options.map((o, i) => {
                      return (
                        <li
                          key={i}
                          onClick={() => {
                            setFilterState((prevFilterState) => ({
                              ...prevFilterState,
                              ordering: o,
                            }));
                            setSubToggle2(false);
                          }}
                        >
                          {o}
                        </li>
                      );
                    })}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
