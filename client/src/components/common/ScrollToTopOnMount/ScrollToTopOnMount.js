import React, { useEffect } from "react";

const ScrollToTopOnMount = () => {
    // Future browsers will call the behavior value 'auto'
    useEffect(() => {
        window.scrollTo({top: 0, behavior: 'instant'});
    }, []);


    return null
}

export default ScrollToTopOnMount