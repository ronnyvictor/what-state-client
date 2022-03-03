import { useState, useEffect } from 'react'

import './App.css'
import USAMap from './components/USAMap'
import Form from './components/Form'

export default function App() {
	const [states, setStates] = useState()
	const [color, setColor] = useState('#ffeecb')

	useEffect(() => {
		fetch('http://localhost:3003/states')
			.then(res => res.json())
			.then(data => setStates(data))
			.catch(console.error)
	}, [])

	// return (
	// 	<div className='main'>
	// 		<USAMap color={color} />
	// 		<div className='sider'>
	// 			<Form setIsCorrect={setIsCorrect} setColor={setColor} />
	// 			{!states ? (
	// 				<div></div>
	// 			) : (
	// 				states.map(state => {
	// 					return (
	// 						<div>
	// 							<StateInfo key={state.id} state={state} />
	// 						</div>
	// 					)
	// 				})
	// 			)}
	// 		</div>
	// 	</div>
	// )

	return (
		<div className='main'>
			<USAMap color={color} states={states} />
			<div className='sider'>
				{!states ? (
					<div></div>
				) : (
					states.map(state => {
						return (
							<div>
								<Form
									key={state.id}
									setColor={setColor}
									state={state}
								/>
							</div>
						)
					})
				)}
			</div>
		</div>
	)
}
