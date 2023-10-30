import React from 'react'
import { ShimmerPostDetails } from "react-shimmer-effects";

const ShimmerEffect = (show) => {
    return (
        <div>
            {show === true ? (<ShimmerPostDetails card cta variant="EDITOR" />) : null}
        </div>
    )
}

export default ShimmerEffect