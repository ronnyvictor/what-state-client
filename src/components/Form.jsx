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
	input,
}) {
	const onChange = event => {
		setAnswer(event.target.value)
	}

	console.log(stateProps)

	const handleSubmit = event => {
		event.preventDefault()
		if (
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
					correct: true,
				},
			})

			setActiveIndex(activeIndex + 1)

		} else {
			setIsCorrect(false)
			setStateProps({
				...stateProps,
				[activeState.abbreviation]: {
					color: activeState.colors.incorrect,
					correct: false,
				},
			})
		}
	}

	const handleSkip = () => {
		setAnswer('')
		setIsCorrect(false)
		setStateProps({
			...stateProps,
			[activeState.abbreviation]: {
				color: activeState.colors.incorrect,
				correct: false,
			},
		})
		setActiveIndex(activeIndex + 1)
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
					value={answer}
					ref={input}
				/>
			</form>
			<button onClick={handleSkip}>Skip</button>
		</div>
	)
}
