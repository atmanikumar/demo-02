import { useEffect, useState } from 'react';

import axios from 'axios';

import Progress from './Progress';

import './index.css';

const Widget = ({ path, title, handleExpandClick }) => {

    const [data, updateData] = useState({})
    const [isExpanded, toggleExpanded] = useState(false);

    const fetchData = async () => {
        const response = await axios.get(`http://13.232.99.42/${path}`);
        updateData(response.data.data)
    }

    useEffect(() => {
        fetchData()
    }, [])

    const renderProgress = () => {
        const stats = data.stats || {};
        return Object.keys(stats).map((stat) => (
            <Progress {...stats[stat]} key={stats[stat].label} />
        ))
    }

    const renderWidgetTitle = () => {
        const filter = data.filter || {}
        return (
            <div className="widget-title">
                <div className='widget-title-left'>{filter.label}</div>
                <div className='widget-title-right'>{filter.value}%</div>
            </div>
        )
    }

    const renderList = () => {
        const list = data.dataSet && data.dataSet.data || []
        return list.map((item) => (
            <div key={item.label} className='widget-list list-height'>
                <div style={{ color: item.color }} className='widget-content-left list'>{item.label}</div>
                <div style={{ color: item.color }} className='widget-content-right list'>{item.value}</div>
            </div>
        ))
    }

    const renderListHeader = () => {
        const header = data.dataSet && data.dataSet.header || []
        return (
            <div className='widget-list list-header'>
                <div className='widget-content-left'>{header[0]}</div>
                <div className='widget-content-right'>{header[1]}</div>
            </div>
        )
    }

    const handleSelectChange = (event) => {
        const value = event.target.value;
        const list = data.dataSet && data.dataSet.data || [];

        list.sort((a, b) => {
            if(a[value] < b[value]){
                return -1;
            }
            return 1;
        })

        updateData({
            ...data,
            dataSet: {
                ...data.dataSet,
                data: list,
            }
        })
    }

    const handleExpand = () => {
        toggleExpanded(!isExpanded)
        handleExpandClick()
    }

    return (
        <div className={`widget ${isExpanded ? 'expanded' : ''}`}>
            <div className='widget-header'>
                <h3>{title}</h3>
                <div>
                    <select onChange={handleSelectChange}>
                        <option value="label">
                            Sort by Label
                        </option>
                        <option value="value">
                            Sort by Value
                        </option>
                    </select>
                    <i onClick={handleExpand} className={`fa ${isExpanded ? 'fa-minus': 'fa-arrows-alt'}`}></i>
                </div>
            </div>
            <div className="widget-content">
                <div className='widget-left'>
                    <p className='stat'>STATS:</p>

                    {renderProgress()}

                    <a href={`http://13.232.99.42/${path}`} target="_blank" className="view-api">
                        <p>View API</p>
                        <span className="fa fa-arrow-right fa-lg"></span>
                    </a>
                </div>
                <div className='widget-right'>
                    {renderWidgetTitle()}
                    {renderListHeader()}
                    <div className='widget-scroll-list'>
                        {renderList()}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Widget;