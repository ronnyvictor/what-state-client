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
	input,
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
			activeState.name.toLowerCase().replace(/\s/g, '')
		) {
			setAnswer('')
			setIsCorrect(true)
			setScore(score + 1)
			setStateColor({
				...stateColor,
				[activeState.abbreviation]: activeState.colors.correct,
			})
			setActiveIndex(activeIndex++ + 1)
			setActiveState(states[activeIndex])
		}
		if (
			answer.toLowerCase().replace(/\s/g, '') !==
			activeState.name.toLowerCase().replace(/\s/g, '')
		) {
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
