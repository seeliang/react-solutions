import React from 'react';

const list = [1,2,3,4,5,6,7,71,8,82]
export const Part = () => <div>{list.map(i => <p key={i}> number {i} </p> )}</div>;