import { useState, useEffect, useRef } from 'react'

import {
	getAuth,
	GoogleAuthProvider,
	signInWithPopup,
	onAuthStateChanged,
	signOut,
} from 'firebase/auth'
import { app } from './ConnectAuth'

import './App.css'
import USAMap from './components/USAMap'
import Form from './components/Form'
import StateInfo from './components/StateInfo'
import Header from './components/Header'
import ResultsPopup from './components/popups/ResultsPopup'
import HighScoresPopup from './components/popups/HighScoresPopup'
import Loading from './components/popups/Loading'

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
provider.setCustomParameters({
	prompt: 'select_account',
})
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
	const [hsPopup, setHsPopup] = useState(false)
	const [resultPopup, setResultPopup] = useState(false)
	const [loading, setLoading] = useState(false)

	useEffect(() => {
		fetch('http://what-state-rv.uk.r.appspot.com/states')
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
			})
			.catch(alert)
	}

	const handleSignOut = () => {
		signOut(auth)
		answerInput.current.focus()
	}

	useEffect(() => {
		onAuthStateChanged(auth, u => {
			setUser(u)
			console.log(u)
		})
	}, [auth])

	useEffect(() => {
		if (user) {
			fetch(`http://what-state-rv.uk.r.appspot.com/scores/${user.uid}`)
				.then(res => res.json())
				.then(data => setUserScores(data))
				.catch(console.error)
		}
	}, [user])

	useEffect(() => {
		if (loading) {
			fetch(`http://what-state-rv.uk.r.appspot.com/scores/${user.uid}`)
				.then(res => res.json())
				.then(data => setUserScores(data))
				.then(() => {
					setLoading(false)
					setHsPopup(true)
				})
				.catch(console.error)
		}
	}, [loading, user])

	useEffect(() => {
		if (activeIndex === 50) {
			setResultPopup(true)
		}
	}, [activeIndex])

	return (
		<div>
			<header>
				<Header
					handleGoogleLogin={handleGoogleLogin}
					user={user}
					setHsPopup={setHsPopup}
					answerInput={answerInput}
					handleSignOut={handleSignOut}
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
						isCorrect={isCorrect}
						setStates={setStates}
						states={states}
						initial={initial}
						setActiveState={setActiveState}
						setResultPopup={setResultPopup}
					/>
					<StateInfo previousState={previousState} />
				</div>
				<USAMap stateProps={stateProps} />
				<ResultsPopup
					setAnswer={setAnswer}
					setScore={setScore}
					score={score}
					setStates={setStates}
					states={states}
					setActiveState={setActiveState}
					setStateProps={setStateProps}
					stateProps={stateProps}
					setActiveIndex={setActiveIndex}
					initialColor={initial}
					answerInput={answerInput}
					setPreviousState={setPreviousState}
					setIsCorrect={setIsCorrect}
					user={user}
					handleGoogleLogin={handleGoogleLogin}
					setAttempts={setAttempts}
					setLoading={setLoading}
					resultPopup={resultPopup}
					setResultPopup={setResultPopup}
					hsPopup={hsPopup}
				/>
				<div>
					<HighScoresPopup
						userScores={userScores}
						hsPopup={hsPopup}
						setHsPopup={setHsPopup}
						answerInput={answerInput}
						setLoading={setLoading}
					/>
					<Loading loading={loading} />
				</div>
			</div>
		</div>
	)
}
