import React from 'react';

export const Part = ({list}) => <div>{list.map(i => <p key={i}> number {i} </p> )}</div>;