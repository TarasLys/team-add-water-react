


import React, { useState, useEffect } from 'react';
import './App.css';

const App = () => {
  const [amount, setAmount] = useState(0);
  const [time, setTime] = useState('');
  const [modalVisible, setModalVisible] = useState(true);

  useEffect(() => {
    populateTimeDropdown();
  }, []);

  const changeAmount = (delta) => {
    setAmount((prevAmount) => Math.max(0, prevAmount + delta));
  };

  const populateTimeDropdown = () => {
    const now = new Date();
    const currentHour = now.getHours();
    const currentMinute = Math.floor(now.getMinutes() / 5) * 5;
    const timeOptions = [];

    for (let hour = 0; hour < 24; hour++) {
      for (let minute = 0; minute < 60; minute += 5) {
        const optionValue = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
        timeOptions.push(optionValue);
      }
    }

    setTime(`${currentHour.toString().padStart(2, '0')}:${currentMinute.toString().padStart(2, '0')}`);
  };

  const handleSave = () => {
    // Handle save logic here
    console.log('Saved:', { amount, time });
  };

  return (
    <div className="App">
      {modalVisible && (
        <div id="modal" className="modal">
          <div className="modal-content">
            <div className="modal-header">
              <h2>Add water</h2>
              <span className="close" onClick={() => setModalVisible(false)}>&times;</span>
            </div>
            <div className="modal-body">
              <h4 className="label-distance" htmlFor="amount">Choose a value:</h4>
              <label className="label-distance-text" htmlFor="amount">Amount of water:</label>
              <div className="amount-selector">
                <button onClick={() => changeAmount(-50)}>-</button>
                <span id="amount">{amount}ml</span>
                <button onClick={() => changeAmount(50)}>+</button>
              </div>
              <label className="label-distance" htmlFor="time">Recording time:</label>
              <select className="input-text" id="time" value={time} onChange={(e) => setTime(e.target.value)}>
                {Array.from({ length: 24 * 12 }, (_, i) => {
                  const hour = Math.floor(i / 12).toString().padStart(2, '0');
                  const minute = (i % 12 * 5).toString().padStart(2, '0');
                  const optionValue = `${hour}:${minute}`;
                  return <option key={optionValue} value={optionValue}>{optionValue}</option>;
                })}
              </select>
              <h4 className="label-distance" htmlFor="value">Enter the value of the water used:</h4>
              <input
                className="input-text"
                type="number"
                id="value"
                value={amount}
                onChange={(e) => setAmount(parseInt(e.target.value) || 0)}
              />
              <div className="input-save-container">
                <input type="text" id="autoFillInput" readOnly value={`${amount}ml`} />
                <button className="save-button" onClick={handleSave}>Save</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;






// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;
