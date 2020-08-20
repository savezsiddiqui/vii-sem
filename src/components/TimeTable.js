import React, { useState } from 'react';
import BottomNav from './BottomNav';
import moment from 'moment';
import { Container, Row, Col } from 'react-bootstrap';

const TimeTable = ({ local, setLocal }) => {
	const [index, setIndex] = useState((moment().isoWeekday() - 1) % 6);
	let hour = parseInt(moment().format('H'));

	return (
		<Container>
			<Row style={{ minHeight: '100vh', padding: '5rem 1rem' }}>
				<Col xs={12} className='my-3'>
					<h1><span>{local[index]['day']}</span></h1>
					<div style={{ background: '#f50057', height: '0.2rem', width: '43%' }}>
					</div>
				</Col>
				{Object.entries(local[index]).map(([key, value]) => {
					if (key !== 'day') {
						let hr = parseInt(key.slice(0, key.indexOf('-')));
						hr = hr <= 5 ? (12 + hr) : hr;

						if (hour === hr && index == moment().isoWeekday() - 1) {
							return (
								<Col xs={12} className='my-3 glow' style={{ ['--color']: 'lightgreen' }} key={key}>
									<h3 className='font-weight-bolder'>{key}</h3>
									<h4>{value}</h4>
								</Col>
							)
						}
						else if (hr === hour + 1 && index == moment().isoWeekday() - 1) {
							return (
								<Col xs={12} className='my-3 glow' style={{ ['--color']: '#ffd180' }} key={key}>
									<h3 className='font-weight-bolder'>{key}</h3>
									<h4>{value}</h4>
								</Col>
							)
						}
						else {
							return (
								<Col xs={12} className='my-3' key={key}>
									<h3 className='font-weight-bolder'>{key}</h3>
									<h4>{value}</h4>
								</Col>
							)
						}
					}
				})}
			</Row>
			<BottomNav setIndex={setIndex} setLocal={setLocal} />
		</Container>
	)
}

export default TimeTable;
