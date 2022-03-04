import { useState, useEffect } from 'react'

import './App.css'
import USAMap from './components/USAMap'
import Form from './components/Form'
import StateInfo from './components/StateInfo'

export default function App() {
	const [isCorrect, setIsCorrect] = useState()
	const [states, setStates] = useState()
	const [activeState, setActiveState] = useState()

	const [stateColor, setStateColor] = useState({
		Alabama: '#d1be9d',
		Alaska: '#d1be9d',
		Arizona: '#d1be9d',
		Arkansas: '#d1be9d',
		California: '#d1be9d',
		New_Jersey: '#d1be9d',
	})

	useEffect(() => {
		fetch('http://localhost:3003/states')
			.then(res => res.json())
			.then(data => {
				setStates(data.sort(() => Math.random() - 0.5))
				setActiveState(data[0])
				setStateColor({...stateColor, [data[0].pathId]: data[0].colors.active})
			})
			.catch(console.error)
	}, [])

	// console.log(states)
	console.log(activeState)

	// return (
	// 	<div className='main'>
	// 		<USAMap stateColor={stateColor} />
	// 		<div className='sider'>
	// 			<Form
	// 				setStateColor={setStateColor}
	// 				setIsCorrect={setIsCorrect}
	// 				states={states}
	// 				colors={colors}
	// 			/>
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
			<USAMap stateColor={stateColor} />
			<div className='sider'>
				<Form
					setStateColor={setStateColor}
					setIsCorrect={setIsCorrect}
					states={states}
					setActiveState={setActiveState}
					activeState={activeState}
					stateColor={stateColor}
				/>
				{!states ? (
					<div></div>
				) : isCorrect === true ? (
					states.map(state => {
						return (
							<StateInfo
								key={state.id}
								state={state}
								activeState={activeState}
								isCorrect={isCorrect}
							/>
						)
					})
				) : (
					<></>
				)}
			</div>
		</div>
	)

	// return (
	// 	<div className='main'>
	// 		<USAMap stateColor={stateColor} states={states} />
	// 		<div className='sider'>
	// 			{!states ? (
	// 				<div></div>
	// 			) : (
	// 				states.map(state => {
	// 					return (
	// 						<div>
	// 							<Form
	// 								key={state.id}
	// 								setStateColor={setStateColor}
	// 								state={state}
	// 							/>
	// 						</div>
	// 					)
	// 				})
	// 			)}
	// 		</div>
	// 	</div>
	// )
}
