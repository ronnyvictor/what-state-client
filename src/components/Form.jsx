export default function Form({
	setAnswer,
	answer,
	states,
	setIsCorrect,
	setActiveState,
	activeState,
	activeIndex,
	setActiveIndex,
	setStateColor,
	stateColor,
	setScore,
	score,
}) {
	// const [answer, setAnswer] = useState('')

	const onChange = event => {
		setAnswer(event.target.value)
	}

	const onBlur = event => {
		// if (activeState) {
			event.preventDefault()
			const target = event.currentTarget
			target.focus()
		// }
	}

	// console.log(activeIndex)

	const handleSubmit = event => {
		event.preventDefault()
		if (answer.toLowerCase() === activeState.name.toLowerCase()) {
			setAnswer('')
			setIsCorrect(true)
			setScore(score + 1)
			setStateColor({
				...stateColor,
				[activeState.abbreviation]: activeState.colors.correct,
				// [this.activeState.abbreviation]: 'blue'
			})
			setActiveIndex(activeIndex++ + 1)
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

	const handleSkip = () => {
		setAnswer('')
		setIsCorrect(false)
		setStateColor({
			...stateColor,
			[activeState.abbreviation]: activeState.colors.incorrect,
		})
		setActiveIndex(activeIndex++ + 1)
		setActiveState(states[activeIndex])
	}

	return (
		<div>
			<form onSubmit={handleSubmit}>
				<input
					type='text'
					autoFocus='false'
					spellCheck='false'
					placeholder='Press enter to submit'
					onChange={onChange}
					// onBlur={onBlur}
					value={answer}
				/>
			</form>
			<button onClick={handleSkip}>Skip</button>
		</div>
	)
}
