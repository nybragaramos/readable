import React from 'react'
import { PropagateLoader } from 'react-spinners';

const Loader = props => {

  return (
    <div className='loader'>
        <PropagateLoader
          css=''
          sizeUnit={"px"}
          size={20}
          color={'#b84fb1'}
          loading={true}
        />
    </div>
  )
}

export default Loader