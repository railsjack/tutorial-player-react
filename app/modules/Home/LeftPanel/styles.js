export default {
  left_panel: {
    position: 'absolute',
    zIndex: '1001',
    width: '0px',
    height: '100%',
    transition: 'width 0.3s',
    overflow: 'visible',
    backgroundColor: 'rgba(22, 25, 34, .9)',
  },
  left_panel_open: {
    width: '400px'
  },
  control_button: {
    position: 'absolute',
    top: '50px',
    right: '-25px',
    display: 'inline-block',
    width: '25px',
    height: '28px',
    lineHeight: '28px',
    borderTopRightRadius: '10px',
    borderBottomRightRadius: '10px',
    textDecoration: 'none',
    textAlign: 'center',
    color: 'white',
    fontWeight: 'bold',
    backgroundColor: '#111'
  },
  control_button_open: {
    paddingRight: 2
  },
  list: {
    height: '100%',
    padding: 0,
    margin: 20,
  },
  list_item: {
    cursor: 'pointer',
    height: 30,
    marginRight: 20,
  }
};
