import React from 'react';
import { Splitter } from 'antd';
import FlashSalesHeader from '../Flash Sale/flashSaleHeader';

function Section({ text, imgSrc }) {
  return (
    <div
      style={{
        height: '100%',
        width: '100%',
        position: 'relative',
        backgroundColor: 'black',
        overflow: 'hidden',
        margin: 0,
        padding: 0,
      }}
    >
      <img
        src={imgSrc}
        alt={text}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          opacity: 0.5,
          display: 'block',
        }}
      />
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          color: '#f97316',
          fontSize: 24,
          fontWeight: 'bold',
          textAlign: 'center',
        }}
      >
        {text}
      </div>
    </div>
  );
}

function App() {
  return (
<div>
  <FlashSalesHeader label ="Feature" title = "New Arrival"/>
<Splitter style={{ height: '300px' }}>
      {/* Left Panel */}
      <Splitter.Panel collapsible>
        <Section
          text="Left Panel"
          imgSrc="https://via.placeholder.com/300x300.png?text=Left"
        />
      </Splitter.Panel>

      {/* Right Panel */}
      <Splitter.Panel>
        <Splitter layout="vertical">
          {/* Top Right */}
          <Splitter.Panel>
            <Section
              text="Top Panel"
              imgSrc="https://via.placeholder.com/600x150.png?text=Top"
            />
          </Splitter.Panel>

          {/* Bottom Right with two horizontal sections */}
          <Splitter.Panel className='mt-2'>
            <Splitter>
              <Splitter.Panel>
                <Section
                  text="Bottom Left"
                  imgSrc="https://via.placeholder.com/300x150.png?text=Bottom+Left"
                />
              </Splitter.Panel>
              <Splitter.Panel>
                <Section
                  text="Bottom Right"
                  imgSrc="https://via.placeholder.com/300x150.png?text=Bottom+Right"
                />
              </Splitter.Panel>
            </Splitter>
          </Splitter.Panel>
        </Splitter>
      </Splitter.Panel>
    </Splitter>
</div>
   
  );
}

export default App;
