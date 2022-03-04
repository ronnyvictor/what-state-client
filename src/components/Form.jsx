import { useState } from 'react'

export default function Form({
	states,
	setIsCorrect,
	setActiveState,
	activeState,
	setStateColor,
	stateColor,
	setScore,
	score,
}) {
	const [answer, setAnswer] = useState('')
	const [activeIndex, setActiveIndex] = useState(0)

	const onChange = event => {
		setAnswer(event.target.value)
	}

	const handleSubmit = event => {
		event.preventDefault()
		if (answer.toLowerCase() === activeState.name.toLowerCase()) {
			setAnswer('')
			setIsCorrect(true)
			setScore(score + 1)
			setStateColor({
				...stateColor,
				[activeState.abbreviation]: activeState.colors.correct,
			})
			setActiveIndex(activeIndex + 1)
			setActiveState(states[activeIndex])
		}
		if (answer.toLowerCase() !== activeState.name.toLowerCase()) {
			setIsCorrect(false)
			setStateColor({
				...stateColor,
				[activeState.abbreviation]: activeState.colors.incorrect,
			})
			console.log('Incorrect!')
		}
	}

	// const handleSubmit = event => {
	// 	event.preventDefault()
	// 	if (!activeState){
	// 		console.log('no state')
	// 	} else if (answer.toLowerCase() === activeState.name.toLowerCase()) {
	// 		setAnswer('')
	// 		setIsCorrect(true)
	// 		setStateColor({
	// 			...stateColor,
	// 			[activeState.abbreviation]: activeState.colors.correct,
	// 		})
	// 		setActiveIndex(activeIndex + 1)
	// 		setActiveState(states[activeIndex])
	// 	} else {setIsCorrect(false)
	// 		setStateColor({
	// 			...stateColor,
	// 			[activeState.name]: activeState.colors.incorrect,
	// 		})
	// 		console.log('Incorrect!')
	// 	} }
	// }

	const handleSkip = () => {
		setAnswer('')
		setIsCorrect(false)
		setStateColor({
			...stateColor,
			[activeState.abbreviation]: activeState.colors.incorrect,
		})
		console.log('Incorrect!')
		setActiveIndex(activeIndex + 1)
		setActiveState(states[activeIndex])
	}

	return (
		<div>
			<form onSubmit={handleSubmit}>
				<input
					type='text'
					autoFocus
					spellCheck='false'
					placeholder='Press enter to submit'
					onChange={onChange}
					value={answer}
				/>
			</form>
			<button onClick={handleSkip}>Skip</button>
		</div>
	)
}
