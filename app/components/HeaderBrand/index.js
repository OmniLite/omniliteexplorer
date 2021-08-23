/**
 *
 * HeaderBrand
 *
 */

import React, { memo } from 'react';
import { NavbarBrand } from 'reactstrap';
import isLTC from 'utils/isLTC';
import { getSufixURL } from 'utils/getLocationPath';

function HeaderBrand() {
  const brandURL = getSufixURL();

  return (
    <NavbarBrand href={brandURL}>
      {isLTC && <span>OmniLite Explorer</span>}
    </NavbarBrand>
  );
}

HeaderBrand.propTypes = {};

export default memo(HeaderBrand);
