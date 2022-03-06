export default function Form({
	setAnswer,
	answer,
	states,
	setIsCorrect,
	setActiveState,
	activeState,
	activeIndex,
	setActiveIndex,
	setState,
	state,
	setScore,
	score,
	input,
	setPreviousState,
}) {
	const onChange = event => {
		setAnswer(event.target.value)
	}

	// const onFocus = event => {
	// 	event.preventDefault()
	// 	if (!activeState) {
	// 	input.current.blur()
	// 	}
	// }

	// console.log(activeIndex)

	const handleSubmit = event => {
		event.preventDefault()
		if (
			answer.toLowerCase().replace(/\s/g, '') ===
			activeState.name.toLowerCase().replace(/\s/g, '') || activeState.abbreviation.toLowerCase()
		) {
			setAnswer('')
			setIsCorrect(true)
			setScore(score + 1)
			setState({
				...state,
				[activeState.abbreviation]: {
					color: activeState.colors.correct,
					correctness: 'correct',
				},
			})
			setActiveIndex(activeIndex++ + 1)
			setActiveState(states[activeIndex])
			setPreviousState(states[activeIndex - 1])
		} else {
			setIsCorrect(false)
			setState({
				...state,
				[activeState.abbreviation]: {
					color: activeState.colors.incorrect,
					correctness: 'correct',
				},
			})
		}
	}

	const handleSkip = () => {
		setAnswer('')
		setIsCorrect(false)
		setState({
			...state,
			[activeState.abbreviation]: {
				color: activeState.colors.incorrect,
				correctness: 'incorrect',
			},
		})
		setActiveIndex(activeIndex++ + 1)
		setActiveState(states[activeIndex])
		setPreviousState(states[activeIndex - 1])
		input.current.focus()
	}

	return (
		<div>
			<form onSubmit={handleSubmit}>
				<input
					type='text'
					autoFocus
					spellCheck={false}
					placeholder='Press enter to submit'
					onChange={onChange}
					// onBlur={onBlur}
					// onFocus={onFocus}
					value={answer}
					ref={input}
				/>
			</form>
			<button onClick={handleSkip}>Skip</button>
		</div>
	)
}
