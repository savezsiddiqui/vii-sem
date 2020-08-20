import React, { useState, useEffect } from 'react';
import TimeTable from './components/TimeTable';
import Setup from './components/Setup';
import './App.css';

const initialState = () => {
	const savedMode = JSON.parse(localStorage.getItem('time-table'));
	return savedMode || null;
};

const App = () => {
	const [local, setLocal] = useState(initialState());

	useEffect(() => {
		localStorage.setItem('time-table', JSON.stringify(local));
	}, [local]);

	return (
		<div className='dark-mode'>
			{local === null ? <Setup setLocal={setLocal} /> : <TimeTable local={local} setLocal={setLocal} />}
		</div>
	)
}

export default App;
