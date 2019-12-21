export const styles = {
    signInContainer : {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        width: '560px',
        height: '300px',
        position: 'fixed',
        top: '0px',
        bottom: '0px',
        right: '0px',
        left: '0px',
        zIndex: 10000,
        margin: 'auto',
        padding: '20px',
        background: 'rgba(255, 255, 255, 0.8)',
        borderRadius: '10px',
    },
    error: { 
        fontSize: 10, 
        color: "red" 
    },
    signContainer:{
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        margin: '10px'
    },
    signButton: {
        backgroundColor: '#fb9403',
    },
    close :{
        backgroundColor: '#fb9403',
        top: '8px', 
        right: '8px', 
        position: 'absolute'
    },
    checkbox: {
        color: '#fb9403',
    },
}