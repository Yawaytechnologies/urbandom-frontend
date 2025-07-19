// src/components/Location.jsx

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCountries } from "../../redux/actions/countryactions";
import { fetchStatesByCountry } from "../../redux/actions/stateActions";
import { fetchDistrictsByState } from "../../redux/actions/districtActions";

const Location = ({ value, onChange }) => {
  const dispatch = useDispatch();
  const { countries, loading: loadingCountries } = useSelector((state) => state.countries);
  const { states, loading: loadingStates } = useSelector((state) => state.states);
  const { districts, loading: loadingDistricts } = useSelector((state) => state.districts);

  // Local state for dropdowns (controlled)
  const [countryId, setCountryId] = useState(value?.countryId || "");
  const [stateId, setStateId] = useState(value?.stateId || "");
  const [districtId, setDistrictId] = useState(value?.districtId || "");

  // Fetch countries on mount
  useEffect(() => { dispatch(fetchCountries()); }, [dispatch]);

  // Fetch states when country changes
  useEffect(() => {
    if (countryId) {
      dispatch(fetchStatesByCountry(countryId));
      setStateId(""); setDistrictId("");
      if (onChange) onChange({ countryId, stateId: "", districtId: "" });
    }
  }, [countryId, dispatch]);

  // Fetch districts when state changes
  useEffect(() => {
    if (stateId) {
      dispatch(fetchDistrictsByState(stateId));
      setDistrictId("");
      if (onChange) onChange({ countryId, stateId, districtId: "" });
    }
  }, [stateId, dispatch]);

  // When district changes, notify parent
  useEffect(() => {
    if (districtId && onChange) {
      onChange({ countryId, stateId, districtId });
    }
  }, [districtId]);

  // For programmatic value reset (if value changes from parent)
  useEffect(() => {
    if (value) {
      setCountryId(value.countryId || "");
      setStateId(value.stateId || "");
      setDistrictId(value.districtId || "");
    }
  }, [value]);

  return (
    <div className="flex gap-4 mt-20">
      {/* Country */}
      <select
        className="border rounded px-3 py-2"
        value={countryId}
        onChange={e => setCountryId(e.target.value)}
        disabled={loadingCountries}
      >
        <option value="">Select Country</option>
        {countries.map((c) => (
          <option key={c._id} value={c._id}>{c.name}</option>
        ))}
      </select>

      {/* State */}
      <select
        className="border rounded px-3 py-2"
        value={stateId}
        onChange={e => setStateId(e.target.value)}
        disabled={!countryId || loadingStates}
      >
        <option value="">Select State</option>
        {states.map((s) => (
          <option key={s._id} value={s._id}>{s.name}</option>
        ))}
      </select>

      {/* District */}
      <select
        className="border rounded px-3 py-2"
        value={districtId}
        onChange={e => setDistrictId(e.target.value)}
        disabled={!stateId || loadingDistricts}
      >
        <option value="">Select District</option>
        {districts.map((d) => (
          <option key={d._id} value={d._id}>{d.name}</option>
        ))}
      </select>
    </div>
  );
};

export default Location;
