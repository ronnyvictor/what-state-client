import { useState, useEffect, useRef } from 'react'

import './App.css'
import USAMap from './components/USAMap'
import Score from './components/Score'
import Form from './components/Form'
import StateInfo from './components/StateInfo'
import Header from './components/Header'
import CorrectIncorrect from './components/CorrectIncorrect'
import ScorePopup from './components/popups/ScorePopup'

const initial = {
	AL: { color: '#d1be9d', correctness: undefined },
	AK: { color: '#d1be9d', correctness: undefined },
	AZ: { color: '#d1be9d', correctness: undefined },
	AR: { color: '#d1be9d', correctness: undefined },
	CA: { color: '#d1be9d', correctness: undefined },
	CO: { color: '#d1be9d', correctness: undefined },
	CT: { color: '#d1be9d', correctness: undefined },
	DE: { color: '#d1be9d', correctness: undefined },
	FL: { color: '#d1be9d', correctness: undefined },
	GA: { color: '#d1be9d', correctness: undefined },
	HI: { color: '#d1be9d', correctness: undefined },
	ID: { color: '#d1be9d', correctness: undefined },
	IL: { color: '#d1be9d', correctness: undefined },
	IN: { color: '#d1be9d', correctness: undefined },
	IA: { color: '#d1be9d', correctness: undefined },
	KS: { color: '#d1be9d', correctness: undefined },
	KY: { color: '#d1be9d', correctness: undefined },
	LA: { color: '#d1be9d', correctness: undefined },
	ME: { color: '#d1be9d', correctness: undefined },
	MD: { color: '#d1be9d', correctness: undefined },
	MA: { color: '#d1be9d', correctness: undefined },
	MI: { color: '#d1be9d', correctness: undefined },
	MN: { color: '#d1be9d', correctness: undefined },
	MS: { color: '#d1be9d', correctness: undefined },
	MO: { color: '#d1be9d', correctness: undefined },
	MT: { color: '#d1be9d', correctness: undefined },
	NE: { color: '#d1be9d', correctness: undefined },
	NV: { color: '#d1be9d', correctness: undefined },
	NH: { color: '#d1be9d', correctness: undefined },
	NJ: { color: '#d1be9d', correctness: undefined },
	NM: { color: '#d1be9d', correctness: undefined },
	NY: { color: '#d1be9d', correctness: undefined },
	NC: { color: '#d1be9d', correctness: undefined },
	ND: { color: '#d1be9d', correctness: undefined },
	OH: { color: '#d1be9d', correctness: undefined },
	OK: { color: '#d1be9d', correctness: undefined },
	OR: { color: '#d1be9d', correctness: undefined },
	PA: { color: '#d1be9d', correctness: undefined },
	RI: { color: '#d1be9d', correctness: undefined },
	SC: { color: '#d1be9d', correctness: undefined },
	SD: { color: '#d1be9d', correctness: undefined },
	TN: { color: '#d1be9d', correctness: undefined },
	TX: { color: '#d1be9d', correctness: undefined },
	UT: { color: '#d1be9d', correctness: undefined },
	VT: { color: '#d1be9d', correctness: undefined },
	VA: { color: '#d1be9d', correctness: undefined },
	WA: { color: '#d1be9d', correctness: undefined },
	WV: { color: '#d1be9d', correctness: undefined },
	WI: { color: '#d1be9d', correctness: undefined },
	WY: { color: '#d1be9d', correctness: undefined },
}

export default function App() {
	const answerInput = useRef()
	const [answer, setAnswer] = useState('')
	const [isCorrect, setIsCorrect] = useState()
	const [states, setStates] = useState()
	const [activeState, setActiveState] = useState({})
	const [previousState, setPreviousState] = useState()
	const [activeIndex, setActiveIndex] = useState(0)
	const [score, setScore] = useState(0)
	const [state, setState] = useState(initial)
	// const [state, setState] = useState(initialCorrectness)

	useEffect(() => {
		fetch('http://localhost:3003/states')
			.then(res => res.json())
			.then(data => {
				setStates(data.sort(() => Math.random() - 0.5))
				setActiveState(data[0])
				setState(Object.assign({}, state, {
					[data[0].abbreviation]: Object.assign({}, state[data[0].abbreviation], {
						color: data[0].colors.active
					})
				}))
			})
			.catch(console.error)
	}, [])
	

	// console.log(states)
	// console.log(activeState)
	// console.log(previousState)
	// console.log(activeIndex)
	console.log(state)

	return (
		<div>
			<header>
				<Header />
			</header>
			<div className='main'>
				<div className='sider'>
					<Form
						setAnswer={setAnswer}
						answer={answer}
						setState={setState}
						setIsCorrect={setIsCorrect}
						states={states}
						setActiveState={setActiveState}
						activeState={activeState}
						setActiveIndex={setActiveIndex}
						activeIndex={activeIndex}
						state={state}
						score={score}
						setScore={setScore}
						input={answerInput}
						setPreviousState={setPreviousState}
					/>
					<Score score={score} />
					<CorrectIncorrect isCorrect={isCorrect} />
					<StateInfo previousState={previousState} />
				</div>
				<USAMap state={state} />
				<ScorePopup
					setAnswer={setAnswer}
					setScore={setScore}
					score={score}
					setStates={setStates}
					states={states}
					activeState={activeState}
					setActiveState={setActiveState}
					setState={setState}
					state={state}
					setActiveIndex={setActiveIndex}
					activeIndex={activeIndex}
					initialColor={initial}
					input={answerInput}
					setPreviousState={setPreviousState}
					setIsCorrect={setIsCorrect}
				/>
			</div>
		</div>
	)
}
