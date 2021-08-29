import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UniversityCard from '../components/UniversityCard';
import { universitiesInfo } from '../mockData/universitiesInfo';
import { useLocation, useHistory } from 'react-router-dom';
const UniversitiesList = () => {
  const school_api = `${process.env.REACT_APP_BACKEND_URL}/v1/api/schools?`;
  const searchQuery = useLocation().search;
  const [schools, setSchools] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      console.log(`${school_api}${searchQuery}`, 'list');
      try {
        const { data } = await axios.get(`${school_api}${searchQuery}`);
        setSchools(data);
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchData();
  }, [school_api, searchQuery]);
  return universitiesInfo?.map((university) => (
    <UniversityCard key={university.code} university={university} />
  ));
};
export default UniversitiesList;
