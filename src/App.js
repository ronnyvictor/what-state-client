import { useState, useEffect, useRef } from 'react'

import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { app } from './ConnectAuth'

import './App.css'
import USAMap from './components/USAMap'
import Score from './components/Score'
import Form from './components/Form'
import StateInfo from './components/StateInfo'
import Header from './components/Header'
import CorrectIncorrect from './components/CorrectIncorrect'
import ResultsPopup from './components/popups/ResultsPopup'
import HighScoresPopup from './components/popups/HighScoresPopup'

const initial = {
	AL: { color: '#d1be9d', correct: null },
	AK: { color: '#d1be9d', correct: null },
	AZ: { color: '#d1be9d', correct: null },
	AR: { color: '#d1be9d', correct: null },
	CA: { color: '#d1be9d', correct: null },
	CO: { color: '#d1be9d', correct: null },
	CT: { color: '#d1be9d', correct: null },
	DE: { color: '#d1be9d', correct: null },
	FL: { color: '#d1be9d', correct: null },
	GA: { color: '#d1be9d', correct: null },
	HI: { color: '#d1be9d', correct: null },
	ID: { color: '#d1be9d', correct: null },
	IL: { color: '#d1be9d', correct: null },
	IN: { color: '#d1be9d', correct: null },
	IA: { color: '#d1be9d', correct: null },
	KS: { color: '#d1be9d', correct: null },
	KY: { color: '#d1be9d', correct: null },
	LA: { color: '#d1be9d', correct: null },
	ME: { color: '#d1be9d', correct: null },
	MD: { color: '#d1be9d', correct: null },
	MA: { color: '#d1be9d', correct: null },
	MI: { color: '#d1be9d', correct: null },
	MN: { color: '#d1be9d', correct: null },
	MS: { color: '#d1be9d', correct: null },
	MO: { color: '#d1be9d', correct: null },
	MT: { color: '#d1be9d', correct: null },
	NE: { color: '#d1be9d', correct: null },
	NV: { color: '#d1be9d', correct: null },
	NH: { color: '#d1be9d', correct: null },
	NJ: { color: '#d1be9d', correct: null },
	NM: { color: '#d1be9d', correct: null },
	NY: { color: '#d1be9d', correct: null },
	NC: { color: '#d1be9d', correct: null },
	ND: { color: '#d1be9d', correct: null },
	OH: { color: '#d1be9d', correct: null },
	OK: { color: '#d1be9d', correct: null },
	OR: { color: '#d1be9d', correct: null },
	PA: { color: '#d1be9d', correct: null },
	RI: { color: '#d1be9d', correct: null },
	SC: { color: '#d1be9d', correct: null },
	SD: { color: '#d1be9d', correct: null },
	TN: { color: '#d1be9d', correct: null },
	TX: { color: '#d1be9d', correct: null },
	UT: { color: '#d1be9d', correct: null },
	VT: { color: '#d1be9d', correct: null },
	VA: { color: '#d1be9d', correct: null },
	WA: { color: '#d1be9d', correct: null },
	WV: { color: '#d1be9d', correct: null },
	WI: { color: '#d1be9d', correct: null },
	WY: { color: '#d1be9d', correct: null },
}

const provider = new GoogleAuthProvider()
const auth = getAuth(app)

export default function App() {
	const answerInput = useRef()

	const [answer, setAnswer] = useState('')
	const [isCorrect, setIsCorrect] = useState()
	const [states, setStates] = useState()
	const [activeState, setActiveState] = useState()
	const [previousState, setPreviousState] = useState()
	const [activeIndex, setActiveIndex] = useState(0)
	const [attempts, setAttempts] = useState(0)
	const [score, setScore] = useState(0)
	const [stateProps, setStateProps] = useState(initial)
	const [user, setUser] = useState()
	const [userScores, setUserScores] = useState()
	const [hsPopup, setHsPopup] = useState()

	useEffect(() => {
		fetch('http://localhost:3003/states')
			.then(res => res.json())
			.then(data => {
				setStates(data.sort(() => Math.random() - 0.5))
				setActiveState(data[activeIndex])
			})
			.catch(console.error)
	}, [])

	useEffect(() => {
		if (activeState) {
			setActiveState(states[activeIndex])
			setPreviousState(states[activeIndex - 1])
		}
	}, [activeIndex, states, activeState])

	useEffect(() => {
		if (activeState) {
			setStateProps({
				...stateProps,
				[activeState.abbreviation]: {
					color: activeState.colors.active,
					correct: null,
				},
			})
		}
	}, [activeState])

	const handleGoogleLogin = () => {
		answerInput.current.focus()
		signInWithPopup(auth, provider)
			.then(result => {
				setUser(result.user)
				localStorage.setItem('displayName', result.user.displayName)
				localStorage.setItem('avatar', result.user.photoURL)
				localStorage.setItem('uid', result.user.uid)
			})
			.catch(alert)
	}

	useEffect(() => {
		if (user) {
			fetch(`http://localhost:3003/scores/${user.uid}`)
				.then(res => res.json())
				.then(data => setUserScores(data))
				.catch(console.error)
		}
	}, [user, hsPopup])

	return (
		<div>
			<header>
				<Header
					handleGoogleLogin={handleGoogleLogin}
					user={user}
					setHsPopup={setHsPopup}
					setUserScores={setUserScores}
					answerInput={answerInput}
				/>
			</header>
			<div className='main'>
				<div className='sider'>
					<Form
						setAnswer={setAnswer}
						answer={answer}
						setStateProps={setStateProps}
						setIsCorrect={setIsCorrect}
						activeState={activeState}
						setActiveIndex={setActiveIndex}
						activeIndex={activeIndex}
						stateProps={stateProps}
						score={score}
						setScore={setScore}
						answerInput={answerInput}
						attempts={attempts}
						setAttempts={setAttempts}
					/>
					<Score score={score} />
					<CorrectIncorrect isCorrect={isCorrect} />
					<StateInfo previousState={previousState} />
				</div>
				<USAMap stateProps={stateProps} />
				<ResultsPopup
					setAnswer={setAnswer}
					setScore={setScore}
					score={score}
					setStates={setStates}
					states={states}
					activeState={activeState}
					setActiveState={setActiveState}
					setStateProps={setStateProps}
					stateProps={stateProps}
					setActiveIndex={setActiveIndex}
					initialColor={initial}
					answerInput={answerInput}
					setPreviousState={setPreviousState}
					previousState={previousState}
					setIsCorrect={setIsCorrect}
					user={user}
					setHsPopup={setHsPopup}
					hsPopup={hsPopup}
					handleGoogleLogin={handleGoogleLogin}
					setAttempts={setAttempts}
				/>
				<div>
					<HighScoresPopup
						userScores={userScores}
						user={user}
						setUserScores={setUserScores}
						hsPopup={hsPopup}
						setHsPopup={setHsPopup}
						answerInput={answerInput}
					/>
				</div>
			</div>
		</div>
	)
}
