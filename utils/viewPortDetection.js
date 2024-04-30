// ViewportDetection.js

import React, { useState, useEffect } from 'react';
import { Dimensions } from 'react-native';

export let viewportWidth = Dimensions.get('window').width;
export let viewportHeight = Dimensions.get('window').height;

const ViewportDetection = () => {
  const [width, setWidth] = useState(viewportWidth);
  const [height, setHeight] = useState(viewportHeight);

  useEffect(() => {
    const handleViewportChange = () => {
      const { width, height } = Dimensions.get('window');
      setWidth(width);
      setHeight(height);
    };

    // Subscribe to changes in viewport dimensions
    Dimensions.addEventListener('change', handleViewportChange);

    // Cleanup function to unsubscribe from changes
    return () => {
      Dimensions.removeEventListener('change', handleViewportChange);
    };
  }, []);

  return null; // No need to render anything in this component
};

export default ViewportDetection;
