import React, { useState } from 'react';
import { Row, Col, Form, Button, Container } from 'react-bootstrap';
import schedule from '../data/schedule.json';
import courses from '../data/course-codes.json';

const initialState = { batch: '', e1: '', e2: '', e3: '', e4: '' };

const generator = ({ batch, e1, e2, e3, e4 }) => {

	let electives = [e1, e2, e3, e4].map(e => e.toUpperCase()).join('|');

	const batchRegex = batch.length == 1 ?
		'(B' + batch + '|B\\(|LABC\\(|B[1-' + batch +
		']-([' + batch + '-9]|1\\d)|B.*,' + batch + ')'
		: '(B' + batch + '|B\\(|LABC\\(|B.*(1[0-' + batch[1] +
		']-1[' + batch[1] + '-4]|,' + batch + '))'

	const regex = new RegExp(batchRegex + ".*(" + electives + ')');

	let timeTable = [];
	schedule.forEach(item => {
		let newObject = {};
		Object.entries(item).forEach(([key, value]) => {
			if (key === 'day' || value[0] === "LUNCH") {
				newObject[key] = value[0];
			}
			else {
				let entry = value.filter(item => item.match(regex))[0];
				if (entry) {

					let s = entry.indexOf('(');
					let e = entry.indexOf(')');
					let subject;
					if (entry)
						subject = entry.slice(s + 1, e);

					subject = Object.entries(courses).find(([a, b]) => a.includes(subject))[1];
					newObject[key] = entry.slice(0, s) + ', ' + subject;
				}
			}
		})

		timeTable.push(newObject);
	})
	localStorage.setItem('time-table', JSON.stringify(timeTable));
}

const Setup = ({ setLocal }) => {
	const [formData, setFormData] = useState(initialState);
	const { batch, e1, e2, e3, e4 } = formData;

	const onSubmit = (event) => {
		event.preventDefault();
		generator(formData);
		setLocal(JSON.parse(localStorage.getItem('time-table')));
	}

	const onChange = (event) => {
		setFormData({ ...formData, [event.target.name]: event.target.value });
	}

	return (
		<Container style={{ padding: '5rem 1rem' }}>
			<Row>
				<Col xs={12}>
					<Form onSubmit={onSubmit}>
						<Form.Group>
							<Form.Label>Batch</Form.Label>
							<Form.Control type='number' name='batch' onChange={(e) => { onChange(e) }} value={batch} size='lg' placeholder='14' min='1' max='14' required />
						</Form.Group>
						<Form.Group className='mt-5'>
							<Form.Label>Electives</Form.Label>
							<Form.Control type='text' name='e1' value={e1} onChange={(e) => { onChange(e) }} size='lg' placeholder='17B1NCI732' minLength='5' required />
						</Form.Group>
						<Form.Group>
							<Form.Control type='text' name='e2' value={e2} onChange={(e) => { onChange(e) }} size='lg' placeholder='CS427' minLength='5' required />
						</Form.Group>
						<Form.Group>
							<Form.Control type='text' name='e3' value={e3} onChange={(e) => { onChange(e) }} size='lg' placeholder='CS436' minLength='5' required />
						</Form.Group>
						<Form.Group>
							<Form.Control type='text' name='e4' value={e4} onChange={(e) => { onChange(e) }} size='lg' placeholder='HS211' minLength='5' required />
						</Form.Group>
						<Button type='submit' variant='dark' size='lg'>Submit</Button>
					</Form>
				</Col>
				<Col xs={12} className='text-muted text-center' style={{ marginTop: '7rem' }}>
					<h2>DISCLAIMER</h2>
					<p>Only works for B batch.</p>
					<p>Enter you subject-codes exactly the same way as they appear in the excel sheet.
				Otherwize the regex mechanism won't work.</p>
					<p>Don't ask me to build a select instead of a text field.
				It takes time, I don't get paid for it.</p>
					<p>If you like my work, and want to buy me a coffee,
				Google Pay at savezsiddiqui@oksbi</p>
				</Col>
			</Row>
		</Container>
	)
}

export default Setup;
