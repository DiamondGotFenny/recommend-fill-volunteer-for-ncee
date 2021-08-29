import React, { useState } from 'react';

const RecommondationFiltersContext = React.createContext(null);

export const RecomContextProvide = ({ children }) => {
  const recommondationFiltersInit = {
    subjectType: '1',
    targetProvince: '',
    studentScore: '',
    studentProvince: '',
  };
  const [recommondationFilter_context, setRecommondationFilter_context] =
    useState(recommondationFiltersInit);
  return (
    <RecommondationFiltersContext.Provider
      value={{ recommondationFilter_context, setRecommondationFilter_context }}
    >
      {children}
    </RecommondationFiltersContext.Provider>
  );
};

export default RecommondationFiltersContext;
