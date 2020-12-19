import React, {useRef, useState} from 'react';
import ReactDOM from 'react-dom';
import {Select, Switch, Slider, TimePicker, Popover, Button, Tooltip, Popconfirm, Modal, notification} from 'antd';
import NewWindow from 'rc-new-window';
import {mapElementToScreenRect, mapWindowToElement} from 'rc-new-window/lib/ScreenPosition';

const {Option} = Select;

const App = () => {
  const [popup, setPopup] = useState(false);
  const [model, setModel] = useState(false);
  const [win, setWin] = useState<Window>(null);
  const [style, setStyle] = useState({left: 30, top: 60, width: 400, height: 400});

  const ref = useRef();
  const initPosition = () => {
    return mapElementToScreenRect(ref.current, style);
  };

  function onChange(checked: boolean = false) {
    if (!checked && win) {
      setStyle(mapWindowToElement(ref.current, win));
    }
    setPopup(checked);
    setWin(null);
  }

  function showModal() {
    setModel(!model);
  }

  const openNotification = () => {
    notification.open({
      message: 'Notification Title',
      description:
        'This is the content of the notification. This is the content of the notification. This is the content of the notification.',

    });
  };


  let content = (<div className='main' style={style}>
    <Select defaultValue="1" style={{width: 120}}>
      <Option value="1">Select</Option>
      <Option value="2">Select</Option>
      <Option value="3">Select</Option>
    </Select>

    <Popover content={<div>
      <p>Content</p>
      <p>Content</p>
    </div>} title="Title">
      <Button type="primary">Popover</Button>
    </Popover>

    <TimePicker/>

    <Tooltip title="prompt text">
      <Button type="primary">Tooltip</Button>
    </Tooltip>

    <Button type="primary" onClick={openNotification}>
      notification
    </Button>

    <Popconfirm title={'Popconfirm'}>
      <Button>Popconfirm</Button>
    </Popconfirm>
    <hr/>

    <Button type="primary" onClick={showModal}>
      Open Modal
    </Button>
    <Modal title="Basic Modal" visible={model} onOk={showModal} onCancel={showModal}>
      <p>Some contents...</p>
      <p>Some contents...</p>
      <p>Some contents...</p>
    </Modal>

    <Slider range={true} defaultValue={[20, 50]}/>
  </div>);

  if (popup) {
    content = (
      <NewWindow onClose={onChange} onOpen={setWin} initPopupInnerRect={initPosition}>
        {content}
      </NewWindow>
    );
  }

  return (
    <div ref={ref}>
      <span>
         Popup: <Switch checked={popup} onChange={onChange}/>
      </span>

      {content}
    </div>
  );
};

ReactDOM.render(<App/>, document.getElementById('app'));
