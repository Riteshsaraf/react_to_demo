
import React from "react";

function Loader({ loading = false }) {
    return (
        <>
            {
                loading ? (<div className="d-flex justify-content-center">
                    <div className="spinner-border" role="status" style={{ 'marginTop': '50%' }}>
                        <span className="sr-only"></span>
                    </div>
                </div>) : ''
            }
        </>
    );
}

export default Loader;