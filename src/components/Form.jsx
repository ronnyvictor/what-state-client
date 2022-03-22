import { useState } from 'react'

import checkIcon from '../assets/check-icon.svg'
import xIcon from '../assets/x-icon.svg'
import ResetPopup from './popups/ResetPopup'

export default function Form({
	setAnswer,
	answer,
	setIsCorrect,
	activeState,
	activeIndex,
	setActiveIndex,
	setStateProps,
	stateProps,
	setScore,
	score,
	answerInput,
	attempts,
	setAttempts,
	isCorrect,
	setStates,
	initial,
	states,
	setActiveState,
	setResultPopup,
}) {
	const [popup, setPopup] = useState(false)

	const onChange = event => {
		setAnswer(event.target.value)
	}

	const handleSubmit = event => {
		event.preventDefault()
		if (
			!attempts &&
			answer.toLowerCase().replace(/\s/g, '') ===
				activeState.name.toLowerCase().replace(/\s/g, '')
		) {
			setAnswer('')
			setIsCorrect(true)
			setScore(score + 1)

			setStateProps({
				...stateProps,
				[activeState.abbreviation]: {
					color: activeState.colors.correct,
					shadow: 'transparent',
					correct: true,
				},
			})

			setActiveIndex(activeIndex + 1)
		} else if (
			!attempts &&
			answer.toLowerCase() === activeState.abbreviation.toLowerCase()
		) {
			setAnswer('')
			setIsCorrect(true)
			setScore(score + 1)

			setStateProps({
				...stateProps,
				[activeState.abbreviation]: {
					color: activeState.colors.correct,
					shadow: 'transparent',
					correct: true,
				},
			})

			setActiveIndex(activeIndex + 1)
		} else if (
			attempts &&
			answer.toLowerCase().replace(/\s/g, '') ===
				activeState.name.toLowerCase().replace(/\s/g, '')
		) {
			setAnswer('')
			setActiveIndex(activeIndex + 1)
			setAttempts(0)
			setStateProps({
				...stateProps,
				[activeState.abbreviation]: {
					color: activeState.colors.incorrect,
					shadow: 'transparent',
					correct: false,
				},
			})
		} else if (answer && activeIndex < 50) {
			setAttempts(attempts + 1)
			setIsCorrect(false)
		}
	}

	const handleSkip = () => {
		setAnswer('')
		setIsCorrect(false)
		setAttempts(0)
		setStateProps({
			...stateProps,
			[activeState.abbreviation]: {
				color: activeState.colors.incorrect,
				shadow: 'transparent',
				correct: false,
			},
		})
		setActiveIndex(activeIndex + 1)
		answerInput.current.focus()
	}

	const handleReset = () => {
		setAnswer('')
		setIsCorrect()
		setAttempts(0)
		setScore(0)
		setStates(states.sort(() => Math.random() - 0.5))
		setActiveIndex(0)
		setActiveState(states[0])
		setStateProps(initial)
		answerInput.current.focus()
	}

	return (
		<div className='form'>
			<form onSubmit={handleSubmit}>
				<input
					type='text'
					autoFocus
					spellCheck={false}
					placeholder='Press enter to submit'
					onChange={onChange}
					value={answer}
					ref={answerInput}
				/>
			</form>
			<div>
				{activeIndex < 50 ? (
					<>
						<button onClick={handleSkip}>Skip</button>
						<button onClick={() => setPopup(true)}>Reset</button>
					</>
				) : (
					<>
						<button onClick={handleReset}>Try Again</button>
						<button
							onClick={() => {
								setResultPopup(true)
							}}
						>
							View Results
						</button>
					</>
				)}

				{isCorrect === true ? (
					<div className='correct-incorrect'>
						<img src={checkIcon} alt='check icon' />
						<p className='correct'>Correct!</p>
					</div>
				) : isCorrect === false ? (
					<div className='correct-incorrect'>
						<img src={xIcon} alt='x icon' />
						<p className='incorrect'>Incorrect!</p>
					</div>
				) : (
					<></>
				)}
			</div>
			{popup ? (
				<ResetPopup handleReset={handleReset} setPopup={setPopup} />
			) : (
				<></>
			)}
		</div>
	)
}
