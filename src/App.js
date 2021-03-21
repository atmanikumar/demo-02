import {useState} from 'react'

import Navbar from './Navbar';
import Widget from './Widget';

import './App.css';

function App() {

  const [isExpanded, toggleExpand] = useState(false)

  const handleExpand = () => {
    toggleExpand(!isExpanded)
  }

  return (
    <div className="wrapper">
      <Navbar/>
      <div className={`grid-container ${isExpanded ? 'container-expanded': ''}`}>
        <Widget key={'highlights'} handleExpandClick={handleExpand} title="Highlights" path='get_highlight'/>
        <Widget key={'buyers'} handleExpandClick={handleExpand} title="Buyers" path='get_buyer'/>
        <Widget key={'countries'} handleExpandClick={handleExpand} title="Countries" path='get_country'/>
        <Widget key={'income'} handleExpandClick={handleExpand} title="Income" path='get_income'/>
      </div>
    </div>
  );
}

export default App;
