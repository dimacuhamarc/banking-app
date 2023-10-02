import React from 'react'
import './Card.scss'

export const CardStyles = {
  default: 'default',
  cash: 'cash',
};

export const Card = ({title, data, style, icon}) => {
  return (
    <div>
      <div className={'card ' + style}>
        <div className='card-body'>
          <p>{title}</p>
        </div>
        <div className='card-header'>
          <h2>{data}</h2>
        </div>
      </div>
    </div>
  );
};

export const CardBalance = ({accountHolder, accountNumber, data, style, icon}) => {
  return (
    <div>
      <div className={'card ' + style}>
        <div className='card-body'>
          <p>{accountHolder}</p>
        </div>
        <div className='card-header'>
          {icon}
          <h2>{data}</h2>
        </div>
        <div className='card-body'>
          <p>{accountNumber}</p>
        </div>
      </div>
    </div>
  );
};

