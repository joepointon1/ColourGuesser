function ColourBlock({ colour, id }) {
  return <div style={{ backgroundColor: colour }}><h3>{id+1}</h3></div>;
}

export default ColourBlock;
