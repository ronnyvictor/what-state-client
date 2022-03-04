import { useState, useEffect } from 'react'

import './App.css'
import USAMap from './components/USAMap'
import Score from './components/Score'
import Form from './components/Form'
import StateInfo from './components/StateInfo'
import Header from './components/Header'

export default function App() {
	const [isCorrect, setIsCorrect] = useState()
	const [states, setStates] = useState()
	const [activeState, setActiveState] = useState()
	const [score, setScore] = useState(0)
	const [stateColor, setStateColor] = useState({
		AL: '#d1be9d',
		AK: '#d1be9d',
		AZ: '#d1be9d',
		AR: '#d1be9d',
		CA: '#d1be9d',
		CO: '#d1be9d',
		CT: '#d1be9d',
		DE: '#d1be9d',
		FL: '#d1be9d',
		GA: '#d1be9d',
		HI: '#d1be9d',
		ID: '#d1be9d',
		IL: '#d1be9d',
		IN: '#d1be9d',
		IA: '#d1be9d',
		KS: '#d1be9d',
		KY: '#d1be9d',
		LA: '#d1be9d',
		ME: '#d1be9d',
		MD: '#d1be9d',
		MA: '#d1be9d',
		MI: '#d1be9d',
		MN: '#d1be9d',
		MS: '#d1be9d',
		MO: '#d1be9d',
		MT: '#d1be9d',
		NE: '#d1be9d',
		NV: '#d1be9d',
		NH: '#d1be9d',
		NJ: '#d1be9d',
		NM: '#d1be9d',
		NY: '#d1be9d',
		NC: '#d1be9d',
		ND: '#d1be9d',
		OH: '#d1be9d',
		OK: '#d1be9d',
		OR: '#d1be9d',
		PA: '#d1be9d',
		RI: '#d1be9d',
		SC: '#d1be9d',
		SD: '#d1be9d',
		TN: '#d1be9d',
		TX: '#d1be9d',
		UT: '#d1be9d',
		VT: '#d1be9d',
		VA: '#d1be9d',
		WA: '#d1be9d',
		WV: '#d1be9d',
		WI: '#d1be9d',
		WY: '#d1be9d',
	})

	useEffect(() => {
		fetch('http://localhost:3003/states')
			.then(res => res.json())
			.then(data => {
				setStates(data.sort(() => Math.random() - 0.5))
				setActiveState(data[0])
				setStateColor({
					...stateColor,
					[data[0].abbreviation]: data[0].colors.active,
				})
			})
			.catch(console.error)
	}, [])

	console.log(activeState)

	return (
		<>
		<header>
			<Header />
		</header>
		<div className='main'>
			<div className='sider'>
				<Form
					setStateColor={setStateColor}
					setIsCorrect={setIsCorrect}
					states={states}
					setActiveState={setActiveState}
					activeState={activeState}
					stateColor={stateColor}
					score={score}
					setScore={setScore}
				/>
				<Score score={score} />
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
			<USAMap stateColor={stateColor} />
		</div>
		</>
	)
}
