import React from 'react';    //to set title for every page
import Helmet from "react-helmet";

const MetaData = ( {title} ) => {
  return (
    <Helmet>
        <title>{title}</title>
    </Helmet>
  )
}

export default MetaData