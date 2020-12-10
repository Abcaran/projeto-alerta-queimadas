import React, {useState} from 'react';


function Modal({stateInfo, state, children, closeModal}) {

    const containerStyle = {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, .8)',
        zIndex: 999,
    };

    const modalStyle = {
        position: 'absolute',
        padding: '30px 50px',
        top: 50,
        left: 0,
        right: 0,
        marginLeft: 'auto',
        marginRight: 'auto',
        width: 700,
        bottom: 50,
        backgroundColor: 'white',
        borderRadius: 10,
        overflow: 'scroll',
        overflowX: 'hidden'
    };

    const headerStyle = {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 30,
    };

    const closeButtonStyle = {
        cursor: 'pointer',
        fontSize: 30,
    }

    const titleStyle = {
        fontSize: 30,
        margin: 0
    };

    if (stateInfo !== false) {
        return (
            <div style={containerStyle}>
                <div style={modalStyle}>
                    <div style={headerStyle}>
                        <h1 style={titleStyle}>Municípios - {state && state.name}</h1>
                        <span style={closeButtonStyle} onClick={() => {
                            closeModal();
                        }}>X</span>
                    </div>
                    {children}
                </div>
            </div>
        );
    } else {
        return <></>;
    }
}

export default Modal;