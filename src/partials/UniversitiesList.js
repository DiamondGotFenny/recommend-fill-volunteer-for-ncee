import React from 'react';
import UniversityCard from '../components/UniversityCard';
import { universitiesInfo } from '../mockData/universitiesInfo';

const UniversitiesList = () => {
  return universitiesInfo?.map((university) => (
    <UniversityCard key={university.code} university={university} />
  ));
};
export default UniversitiesList;
