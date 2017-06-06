'use strict';

const filterByDistrict = (stations,query) => {
  const districtFiltered = stations.filter((e)=>{
    return e.district.toLowerCase().indexOf(query.toLowerCase())!=-1;
  });
  return districtFiltered;
}
