    // src/components/Screen1Component.js
    import React from 'react';
    import { Link } from 'react-router-dom';

    export const Screen1Component = () => {
    return (
        <div>
        <h2>Screen 1 Content</h2>
        <p>This is the content for Screen 1.</p>
        
        {/* Link to navigate to the UploadComponent */}
        <Link to="/upload">Go to Upload Component</Link>
        
        <Link to= "/display"> Go To Display Componenent</Link>
        </div>
    );
    };


