export default function ScorePopup({
	score,
	setScore,
	setStates,
	states,
	setActiveState,
	activeState,
	setStateColor,
	stateColor,
	setActiveIndex,
	activeIndex,
	initial,
	input,
	setAnswer
}) {
	const handleTryAgain = () => {
		setAnswer('')
		setScore(0)
		setStates(states.sort(() => Math.random() - 0.5))
		setActiveIndex(0)
		setActiveState(states[0])
		setStateColor(initial)
		input.current.focus()
		// console.log(states)
	}

	// console.log(activeState)

	return (
		<>
			{!activeState ? (
				<div className='box'>
					<div className='score-card'>
						<p>You scored {score} out of 50!</p>
						<button onClick={handleTryAgain}>Try Again</button>
					</div>
				</div>
			) : (
				<></>
			)}
		</>
	)
}
