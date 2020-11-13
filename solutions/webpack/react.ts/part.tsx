import React from 'react';

interface PartProps {
    list: []
}

export const Part = ({list} : PartProps) => <div>{list.map(i => <p key={i}> number {i} </p> )}</div>;
Part.displayName = 'Part'